const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const NpcWorldState = sequelize.define('npc_world_state', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time_of_day: {
        type: DataTypes.ENUM('day', 'night'),
        allowNull: false,
        defaultValue: 'day'
    },
    world_state: {
        type: DataTypes.ENUM('normal', 'meeting', 'festival', 'alert', 'mission_open'),
        allowNull: false,
        defaultValue: 'normal'
    },
    mission_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'm_npc_world_state',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
});

module.exports = NpcWorldState;
