const MasterGift = require('../models/MasterGift');
const MasterSticker = require('../models/MasterSticker');

class GiftStickerController {
    /**
     * Get all gifts
     * GET /api/admin/gifts
     */
    static async getAllGifts(req, res) {
        try {
            const gifts = await MasterGift.findAll({ order: [['created_at', 'DESC']] });
            return res.status(200).json({ success: true, data: gifts });
        } catch (error) {
            console.error('Error fetching gifts:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Create a gift
     * POST /api/admin/gifts
     */
    static async createGift(req, res) {
        try {
            const { name, icon_url, sgk_weight, price_usdt } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }
            const gift = await MasterGift.create({
                name,
                icon_url: icon_url || null,
                sgk_weight: sgk_weight || 1,
                price_usdt: price_usdt || 0,
                is_active: true
            });
            return res.status(201).json({ success: true, data: gift });
        } catch (error) {
            console.error('Error creating gift:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Update a gift
     * PUT /api/admin/gifts/:id
     */
    static async updateGift(req, res) {
        try {
            const { id } = req.params;
            const { name, icon_url, sgk_weight, price_usdt, is_active } = req.body;

            const gift = await MasterGift.findByPk(id);
            if (!gift) {
                return res.status(404).json({ success: false, message: 'Gift not found' });
            }

            if (name !== undefined) gift.name = name;
            if (icon_url !== undefined) gift.icon_url = icon_url;
            if (sgk_weight !== undefined) gift.sgk_weight = sgk_weight;
            if (price_usdt !== undefined) gift.price_usdt = price_usdt;
            if (is_active !== undefined) gift.is_active = is_active;
            await gift.save();

            return res.status(200).json({ success: true, data: gift });
        } catch (error) {
            console.error('Error updating gift:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Delete a gift
     * DELETE /api/admin/gifts/:id
     */
    static async deleteGift(req, res) {
        try {
            const { id } = req.params;
            const gift = await MasterGift.findByPk(id);
            if (!gift) {
                return res.status(404).json({ success: false, message: 'Gift not found' });
            }

            // Remove related stream_gifts first to avoid FK constraint
            const StreamGift = require('../models/StreamGift');
            await StreamGift.destroy({ where: { gift_id: id } });

            await gift.destroy();
            return res.status(200).json({ success: true, message: 'Gift deleted successfully' });
        } catch (error) {
            console.error('Error deleting gift:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Get all stickers
     * GET /api/admin/stickers
     */
    static async getAllStickers(req, res) {
        try {
            const stickers = await MasterSticker.findAll({ order: [['created_at', 'DESC']] });
            return res.status(200).json({ success: true, data: stickers });
        } catch (error) {
            console.error('Error fetching stickers:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Create a sticker
     * POST /api/admin/stickers
     */
    static async createSticker(req, res) {
        try {
            const { name, image_url } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }
            const sticker = await MasterSticker.create({
                name,
                image_url: image_url || null,
                is_active: true
            });
            return res.status(201).json({ success: true, data: sticker });
        } catch (error) {
            console.error('Error creating sticker:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Update a sticker
     * PUT /api/admin/stickers/:id
     */
    static async updateSticker(req, res) {
        try {
            const { id } = req.params;
            const { name, image_url, is_active } = req.body;

            const sticker = await MasterSticker.findByPk(id);
            if (!sticker) {
                return res.status(404).json({ success: false, message: 'Sticker not found' });
            }

            if (name !== undefined) sticker.name = name;
            if (image_url !== undefined) sticker.image_url = image_url;
            if (is_active !== undefined) sticker.is_active = is_active;
            await sticker.save();

            return res.status(200).json({ success: true, data: sticker });
        } catch (error) {
            console.error('Error updating sticker:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Delete a sticker
     * DELETE /api/admin/stickers/:id
     */
    static async deleteSticker(req, res) {
        try {
            const { id } = req.params;
            const sticker = await MasterSticker.findByPk(id);
            if (!sticker) {
                return res.status(404).json({ success: false, message: 'Sticker not found' });
            }
            await sticker.destroy();
            return res.status(200).json({ success: true, message: 'Sticker deleted successfully' });
        } catch (error) {
            console.error('Error deleting sticker:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

module.exports = GiftStickerController;
