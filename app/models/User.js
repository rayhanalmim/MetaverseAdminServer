const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    property_ids: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    previous_position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_room: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    last_login_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    nonce: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nft_metadata: {
        type: DataTypes.JSON,
        allowNull: true
    },
    admin_role: {
        type: DataTypes.ENUM('user', 'admin', 'superadmin'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 't_users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
