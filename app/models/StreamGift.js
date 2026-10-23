const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const StreamGift = sequelize.define('stream_gifts', {
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
    gift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'm_gifts',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 't_stream_gifts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = StreamGift;
