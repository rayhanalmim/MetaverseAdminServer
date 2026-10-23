const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const NpcResponse = sequelize.define('npc_responses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    npc_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'sojiro'
    },
    category_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    time_condition: {
        type: DataTypes.ENUM('day', 'night', 'any'),
        allowNull: false,
        defaultValue: 'any'
    },
    world_condition: {
        type: DataTypes.ENUM('normal', 'meeting', 'festival', 'alert', 'mission_open', 'any'),
        allowNull: false,
        defaultValue: 'any'
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    body: {
        type: DataTypes.STRING(400),
        allowNull: false
    },
    recommendation: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    next_action_type: {
        type: DataTypes.ENUM('MOVE_TO', 'EXPLORE', 'SELECT', 'START_MISSION', 'CLOSE_DIALOGUE', 'NONE'),
        allowNull: false,
        defaultValue: 'NONE'
    },
    next_action_target: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    priority: {
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
    tableName: 'm_npc_responses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NpcResponse;
