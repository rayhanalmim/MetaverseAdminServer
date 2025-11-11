const { Sequelize, Op } = require('sequelize');
const LiveStream = require('../models/LiveStream');
const User = require('../models/User');

class LiveStreamController {
    /**
     * Get all live streams
     * GET /api/admin/livestreams
     */
    static async getAllLiveStreams(req, res) {
        try {
            const { page = 1, limit = 10, search = '', is_active } = req.query;
            const offset = (page - 1) * limit;

            const whereClause = {};
            
            // Search in title or description
            if (search) {
                whereClause[Op.or] = [
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ];
            }

            // Filter by active status
            if (is_active !== undefined) {
                whereClause.is_active = is_active === 'true';
            }

            const liveStreams = await LiveStream.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['id', 'username', 'email'],
                        foreignKey: 'created_by'
                    }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: {
                    streams: liveStreams.rows,
                    pagination: {
                        total: liveStreams.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(liveStreams.count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching live streams:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching live streams',
                error: error.message
            });
        }
    }

    /**
     * Get active live stream (for client consumption)
     * GET /api/livestream/active
     */
    static async getActiveLiveStream(req, res) {
        try {
            const activeStream = await LiveStream.findOne({
                where: { 
                    is_active: true 
                },
                order: [['created_at', 'DESC']],
                attributes: ['id', 'title', 'youtube_url', 'description', 'view_count', 'created_at']
            });

            if (!activeStream) {
                return res.status(404).json({
                    success: false,
                    message: 'No active live stream found'
                });
            }

            // Increment view count
            await activeStream.increment('view_count', { by: 1 });

            return res.status(200).json({
                success: true,
                data: activeStream
            });
        } catch (error) {
            console.error('Error fetching active live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching active live stream',
                error: error.message
            });
        }
    }

    /**
     * Get single live stream by ID
     * GET /api/admin/livestreams/:id
     */
    static async getLiveStreamById(req, res) {
        try {
            const { id } = req.params;

            const liveStream = await LiveStream.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['id', 'username', 'email'],
                        foreignKey: 'created_by'
                    }
                ]
            });

            if (!liveStream) {
                return res.status(404).json({
                    success: false,
                    message: 'Live stream not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: liveStream
            });
        } catch (error) {
            console.error('Error fetching live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching live stream',
                error: error.message
            });
        }
    }

    /**
     * Create new live stream
     * POST /api/admin/livestreams
     */
    static async createLiveStream(req, res) {
        try {
            const { title, youtube_url, description, is_active = true } = req.body;
            const created_by = req.session.userId;

            // Check if user is authenticated and is admin
            if (!created_by || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin access required'
                });
            }

            // Validate required fields
            if (!title || !youtube_url) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and YouTube URL are required'
                });
            }

            // Validate YouTube URL format
            const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
            if (!youtubeRegex.test(youtube_url)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide a valid YouTube URL'
                });
            }

            // If setting as active, deactivate other streams
            if (is_active) {
                await LiveStream.update(
                    { is_active: false },
                    { where: { is_active: true } }
                );
            }

            const liveStream = await LiveStream.create({
                title,
                youtube_url,
                description,
                is_active,
                created_by
            });

            return res.status(201).json({
                success: true,
                message: 'Live stream created successfully',
                data: liveStream
            });
        } catch (error) {
            console.error('Error creating live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error creating live stream',
                error: error.message
            });
        }
    }

    /**
     * Update live stream
     * PUT /api/admin/livestreams/:id
     */
    static async updateLiveStream(req, res) {
        try {
            const { id } = req.params;
            const { title, youtube_url, description, is_active } = req.body;

            const liveStream = await LiveStream.findByPk(id);

            if (!liveStream) {
                return res.status(404).json({
                    success: false,
                    message: 'Live stream not found'
                });
            }

            // Validate YouTube URL if provided
            if (youtube_url) {
                const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
                if (!youtubeRegex.test(youtube_url)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Please provide a valid YouTube URL'
                    });
                }
            }

            // If setting as active, deactivate other streams
            if (is_active === true) {
                await LiveStream.update(
                    { is_active: false },
                    { where: { is_active: true, id: { [Op.ne]: id } } }
                );
            }

            // Update the stream
            await liveStream.update({
                title: title || liveStream.title,
                youtube_url: youtube_url || liveStream.youtube_url,
                description: description !== undefined ? description : liveStream.description,
                is_active: is_active !== undefined ? is_active : liveStream.is_active
            });

            return res.status(200).json({
                success: true,
                message: 'Live stream updated successfully',
                data: liveStream
            });
        } catch (error) {
            console.error('Error updating live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating live stream',
                error: error.message
            });
        }
    }

    /**
     * Delete live stream
     * DELETE /api/admin/livestreams/:id
     */
    static async deleteLiveStream(req, res) {
        try {
            const { id } = req.params;

            const liveStream = await LiveStream.findByPk(id);

            if (!liveStream) {
                return res.status(404).json({
                    success: false,
                    message: 'Live stream not found'
                });
            }

            await liveStream.destroy();

            return res.status(200).json({
                success: true,
                message: 'Live stream deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting live stream',
                error: error.message
            });
        }
    }

    /**
     * Toggle live stream active status
     * PATCH /api/admin/livestreams/:id/toggle
     */
    static async toggleLiveStream(req, res) {
        try {
            const { id } = req.params;
            console.log(`[DEBUG] Toggling stream ID: ${id}`);

            // Check if user is authenticated and is admin
            if (!req.session.userId || !req.session.isAdmin) {
                console.log('[DEBUG] Authentication failed');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin access required'
                });
            }

            const liveStream = await LiveStream.findByPk(id);
            console.log(`[DEBUG] Found stream:`, liveStream ? `ID: ${liveStream.id}, Active: ${liveStream.is_active}` : 'NOT FOUND');

            if (!liveStream) {
                return res.status(404).json({
                    success: false,
                    message: 'Live stream not found'
                });
            }

            const newStatus = !liveStream.is_active;
            console.log(`[DEBUG] Toggling from ${liveStream.is_active} to ${newStatus}`);

            // If activating, deactivate other streams
            if (newStatus) {
                console.log('[DEBUG] Deactivating other streams...');
                await LiveStream.update(
                    { is_active: false },
                    { where: { is_active: true, id: { [Op.ne]: id } } }
                );
            }

            await liveStream.update({ is_active: newStatus });
            console.log(`[DEBUG] Stream updated successfully`);

            // Reload the stream to get updated data
            await liveStream.reload();

            return res.status(200).json({
                success: true,
                message: `Live stream ${newStatus ? 'activated' : 'deactivated'} successfully`,
                data: liveStream
            });
        } catch (error) {
            console.error('Error toggling live stream:', error);
            return res.status(500).json({
                success: false,
                message: 'Error toggling live stream status',
                error: error.message
            });
        }
    }

    /**
     * Get live stream statistics
     * GET /api/admin/livestreams/stats
     */
    static async getLiveStreamStats(req, res) {
        try {
            const totalStreams = await LiveStream.count();
            const activeStreams = await LiveStream.count({ where: { is_active: true } });
            const totalViews = await LiveStream.sum('view_count') || 0;
            
            const recentStreams = await LiveStream.findAll({
                limit: 5,
                order: [['created_at', 'DESC']],
                attributes: ['id', 'title', 'view_count', 'is_active', 'created_at']
            });

            return res.status(200).json({
                success: true,
                data: {
                    totalStreams,
                    activeStreams,
                    totalViews,
                    recentStreams
                }
            });
        } catch (error) {
            console.error('Error fetching live stream stats:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching live stream statistics',
                error: error.message
            });
        }
    }
}

module.exports = LiveStreamController;
