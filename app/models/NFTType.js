const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const NFTType = sequelize.define('nft_types', {
    token_address: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chain_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'm_nft_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NFTType;