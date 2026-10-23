const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const StreamSlot = sequelize.define('stream_slots', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stream_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_user_streams',
            key: 'id'
        }
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
        type: DataTypes.ENUM('reserved', 'entered', 'cancelled'),
        allowNull: false,
        defaultValue: 'reserved'
    },
    reserved_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    entered_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 't_stream_slots',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['stream_id', 'user_id']
        }
    ]
});

module.exports = StreamSlot;
