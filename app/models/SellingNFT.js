const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SellingNFT = sequelize.define('selling_nfts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listing_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chain_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selling_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    end_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_sync: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    buyer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    seller: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nft_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 't_selling_nfts',
    timestamps: false
});

module.exports = SellingNFT;