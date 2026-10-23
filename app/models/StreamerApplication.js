const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const StreamerApplication = sequelize.define('streamer_applications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    },
    application_note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    admin_note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reviewed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    reviewed_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 't_streamer_applications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = StreamerApplication;
