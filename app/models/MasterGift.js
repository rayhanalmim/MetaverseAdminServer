const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MasterGift = sequelize.define('gifts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    icon_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    sgk_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price_usdt: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
        defaultValue: 0
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'm_gifts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = MasterGift;
