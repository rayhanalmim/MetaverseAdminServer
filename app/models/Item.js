const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Item = sequelize.define('items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('0', '1', '2'),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('body', 'mask', 'glove', 'hat', 'shoe', 'horse', 'bow'),
        allowNull: false
    },
    parts_hided: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stat_jump: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stat_move: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pattern: {
        type: DataTypes.ENUM('default', 'item'),
        allowNull: false,
        defaultValue: 'default'
    },
    set_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'system'
    },
    is_selling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    chain_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'm_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Item;