const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Avatar = sequelize.define('avatars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('0', '1', '2'),
        allowNull: false
    },
    avatar_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'm_avatars',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Avatar;