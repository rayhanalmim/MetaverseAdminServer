const { Op } = require('sequelize');
const StreamerApplication = require('../models/StreamerApplication');
const User = require('../models/User');

class StreamerApplicationController {
    /**
     * Get all streamer applications
     * GET /api/admin/streamer-applications
     */
    static async getAllApplications(req, res) {
        try {
            const { page = 1, limit = 10, status } = req.query;
            const offset = (page - 1) * limit;

            const whereClause = {};
            if (status) {
                whereClause.status = status;
            }

            const applications = await StreamerApplication.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        as: 'applicant',
                        attributes: ['id', 'username', 'email'],
                        foreignKey: 'user_id'
                    }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: {
                    applications: applications.rows,
                    pagination: {
                        total: applications.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(applications.count / limit)
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching streamer applications:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Approve or reject a streamer application
     * PATCH /api/admin/streamer-applications/:id/review
     */
    static async reviewApplication(req, res) {
        try {
            const { id } = req.params;
            const { status, admin_note } = req.body;

            if (!['approved', 'rejected'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Status must be approved or rejected' });
            }

            const application = await StreamerApplication.findByPk(id);
            if (!application) {
                return res.status(404).json({ success: false, message: 'Application not found' });
            }

            if (application.status !== 'pending') {
                return res.status(400).json({ success: false, message: 'Only pending applications can be reviewed' });
            }

            application.status = status;
            application.admin_note = admin_note || null;
            application.reviewed_by = req.adminId || null;
            application.reviewed_at = new Date();
            await application.save();

            // If approved, update the user's is_streamer flag
            if (status === 'approved') {
                await User.update(
                    { is_streamer: true },
                    { where: { id: application.user_id } }
                );
            }

            return res.status(200).json({ success: true, data: application });
        } catch (error) {
            console.error('Error reviewing application:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

// Set up model associations
StreamerApplication.belongsTo(User, { as: 'applicant', foreignKey: 'user_id' });
StreamerApplication.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewed_by' });

module.exports = StreamerApplicationController;
