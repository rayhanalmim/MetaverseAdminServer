const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SgkGrant = sequelize.define('sgk_grants', {
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
    reason: {
        type: DataTypes.ENUM('SLOT_JOIN', 'GIFT_SENT'),
        allowNull: false
    },
    sgk_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 't_sgk_grants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = SgkGrant;
