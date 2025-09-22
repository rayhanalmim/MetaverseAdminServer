const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const NFT = sequelize.define('nfts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chain_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token_uri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metadata: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_sync_metadata: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    last_sync: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    is_for_rent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    rent_price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rent_period_days: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tenant_wallet: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rent_due_at: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    grace_until: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    rental_status: {
        type: DataTypes.ENUM('listed', 'active', 'late', 'evicted', 'ended'),
        allowNull: true
    }
}, {
    tableName: 't_nfts',
    timestamps: false
});

module.exports = NFT;