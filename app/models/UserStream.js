const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UserStream = sequelize.define('user_streams', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    streamer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'live', 'ended'),
        allowNull: false,
        defaultValue: 'pending'
    },
    thumbnail_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    max_slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    scheduled_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 't_user_streams',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserStream;
