const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const StreamSticker = sequelize.define('stream_stickers', {
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
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    sticker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'm_stickers',
            key: 'id'
        }
    }
}, {
    tableName: 't_stream_stickers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = StreamSticker;
