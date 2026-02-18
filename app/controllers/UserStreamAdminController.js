const { Op } = require('sequelize');
const UserStream = require('../models/UserStream');
const StreamSlot = require('../models/StreamSlot');
const StreamGift = require('../models/StreamGift');
const StreamSticker = require('../models/StreamSticker');
const SgkGrant = require('../models/SgkGrant');
const User = require('../models/User');

class UserStreamAdminController {
    /**
     * Get all user streams
     * GET /api/admin/user-streams
     */
    static async getAllUserStreams(req, res) {
        try {
            const { page = 1, limit = 10, search = '', status } = req.query;
            const offset = (page - 1) * limit;

            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ];
            }

            if (status) {
                whereClause.status = status;
            }

            const streams = await UserStream.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        as: 'streamer',
                        attributes: ['id', 'username', 'email'],
                        foreignKey: 'streamer_id'
                    }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: {
                    streams: streams.rows,
                    pagination: {
                        total: streams.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(streams.count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching user streams:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Get a single user stream by ID
     * GET /api/admin/user-streams/:id
     */
    static async getUserStreamById(req, res) {
        try {
            const { id } = req.params;
            const stream = await UserStream.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: 'streamer',
                        attributes: ['id', 'username', 'email'],
                        foreignKey: 'streamer_id'
                    }
                ]
            });

            if (!stream) {
                return res.status(404).json({ success: false, message: 'Stream not found' });
            }

            const slotCount = await StreamSlot.count({
                where: { stream_id: id, status: { [Op.ne]: 'cancelled' } }
            });

            const giftCount = await StreamGift.count({ where: { stream_id: id } });
            const stickerCount = await StreamSticker.count({ where: { stream_id: id } });

            return res.status(200).json({
                success: true,
                data: {
                    ...stream.toJSON(),
                    stats: { slotCount, giftCount, stickerCount }
                }
            });
        } catch (error) {
            console.error('Error fetching user stream:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Approve or reject a user stream
     * PATCH /api/admin/user-streams/:id/status
     */
    static async updateStreamStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!['approved', 'rejected'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Status must be approved or rejected' });
            }

            const stream = await UserStream.findByPk(id);
            if (!stream) {
                return res.status(404).json({ success: false, message: 'Stream not found' });
            }

            if (stream.status !== 'pending') {
                return res.status(400).json({ success: false, message: 'Only pending streams can be approved or rejected' });
            }

            stream.status = status;
            await stream.save();

            return res.status(200).json({ success: true, data: stream });
        } catch (error) {
            console.error('Error updating stream status:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Delete a user stream
     * DELETE /api/admin/user-streams/:id
     */
    static async deleteUserStream(req, res) {
        try {
            const { id } = req.params;
            const stream = await UserStream.findByPk(id);

            if (!stream) {
                return res.status(404).json({ success: false, message: 'Stream not found' });
            }

            await stream.destroy();
            return res.status(200).json({ success: true, message: 'Stream deleted successfully' });
        } catch (error) {
            console.error('Error deleting user stream:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Get user stream statistics
     * GET /api/admin/user-streams/stats
     */
    static async getUserStreamStats(req, res) {
        try {
            const totalStreams = await UserStream.count();
            const liveStreams = await UserStream.count({ where: { status: 'live' } });
            const pendingStreams = await UserStream.count({ where: { status: 'pending' } });
            const totalSlots = await StreamSlot.count();
            const totalGifts = await StreamGift.count();
            const totalSgk = await SgkGrant.sum('sgk_amount') || 0;

            return res.status(200).json({
                success: true,
                data: {
                    totalStreams,
                    liveStreams,
                    pendingStreams,
                    totalSlots,
                    totalGifts,
                    totalSgk
                }
            });
        } catch (error) {
            console.error('Error fetching user stream stats:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

// Set up model associations
UserStream.belongsTo(User, { as: 'streamer', foreignKey: 'streamer_id' });
StreamSlot.belongsTo(UserStream, { foreignKey: 'stream_id' });
StreamSlot.belongsTo(User, { foreignKey: 'user_id' });
StreamGift.belongsTo(UserStream, { foreignKey: 'stream_id' });
StreamGift.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
StreamSticker.belongsTo(UserStream, { foreignKey: 'stream_id' });
StreamSticker.belongsTo(User, { as: 'stickerSender', foreignKey: 'sender_id' });
SgkGrant.belongsTo(UserStream, { foreignKey: 'stream_id' });
SgkGrant.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserStreamAdminController;
