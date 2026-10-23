const NpcWorldState = require('../models/NpcWorldState');
const NpcCategory = require('../models/NpcCategory');
const NpcGreeting = require('../models/NpcGreeting');
const NpcResponse = require('../models/NpcResponse');

class NpcAdminController {
    // ─── World State ──────────────────────────────────────
    static async getWorldState(req, res) {
        try {
            let row = await NpcWorldState.findByPk(1);
            if (!row) {
                row = await NpcWorldState.create({
                    id: 1,
                    time_of_day: 'day',
                    world_state: 'normal',
                    mission_available: false,
                });
            }
            res.json({ success: true, data: row });
        } catch (e) {
            console.error('getWorldState error:', e);
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async updateWorldState(req, res) {
        try {
            const { time_of_day, world_state, mission_available } = req.body;
            let row = await NpcWorldState.findByPk(1);
            if (!row) {
                row = await NpcWorldState.create({
                    id: 1,
                    time_of_day: time_of_day || 'day',
                    world_state: world_state || 'normal',
                    mission_available: mission_available ?? false,
                });
            } else {
                if (time_of_day !== undefined) row.time_of_day = time_of_day;
                if (world_state !== undefined) row.world_state = world_state;
                if (mission_available !== undefined) row.mission_available = !!mission_available;
                await row.save();
            }
            res.json({ success: true, data: row });
        } catch (e) {
            console.error('updateWorldState error:', e);
            res.status(500).json({ success: false, message: e.message });
        }
    }

    // ─── Categories ───────────────────────────────────────
    static async listCategories(req, res) {
        try {
            const rows = await NpcCategory.findAll({ order: [['display_order', 'ASC']] });
            res.json({ success: true, data: rows });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async createCategory(req, res) {
        try {
            const row = await NpcCategory.create(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const row = await NpcCategory.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.update(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const row = await NpcCategory.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.destroy();
            res.json({ success: true });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    // ─── Greetings ────────────────────────────────────────
    static async listGreetings(req, res) {
        try {
            const where = {};
            if (req.query.npc_id) where.npc_id = req.query.npc_id;
            const rows = await NpcGreeting.findAll({
                where,
                order: [['priority', 'DESC'], ['id', 'ASC']],
            });
            res.json({ success: true, data: rows });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async createGreeting(req, res) {
        try {
            const row = await NpcGreeting.create(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async updateGreeting(req, res) {
        try {
            const row = await NpcGreeting.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.update(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async deleteGreeting(req, res) {
        try {
            const row = await NpcGreeting.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.destroy();
            res.json({ success: true });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    // ─── Responses ────────────────────────────────────────
    static async listResponses(req, res) {
        try {
            const where = {};
            if (req.query.npc_id) where.npc_id = req.query.npc_id;
            if (req.query.category_id) where.category_id = req.query.category_id;
            const rows = await NpcResponse.findAll({
                where,
                order: [['category_id', 'ASC'], ['priority', 'DESC'], ['id', 'ASC']],
            });
            res.json({ success: true, data: rows });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async createResponse(req, res) {
        try {
            const row = await NpcResponse.create(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async updateResponse(req, res) {
        try {
            const row = await NpcResponse.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.update(req.body);
            res.json({ success: true, data: row });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }

    static async deleteResponse(req, res) {
        try {
            const row = await NpcResponse.findByPk(req.params.id);
            if (!row) return res.status(404).json({ success: false, message: 'Not found' });
            await row.destroy();
            res.json({ success: true });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }
}

module.exports = NpcAdminController;
