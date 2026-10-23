const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const NpcCategory = sequelize.define('npc_categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    label: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'm_npc_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NpcCategory;
