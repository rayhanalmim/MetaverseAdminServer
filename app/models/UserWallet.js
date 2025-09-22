const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UserWallet = sequelize.define('user_wallets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 't_user-wallets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserWallet;