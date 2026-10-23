const { Op } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../models/User');

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const query = `
            SELECT 
                u.id,
                u.wallet_address,
                u.property_ids,
                u.username,
                u.email,
                u.previous_position,
                u.last_position,
                u.last_room,
                u.avatar_id,
                u.last_login_time,
                u.nonce,
                u.created_at,
                u.updated_at,
                u.nft_metadata,
                a.name as avatar_name,
                a.gender as avatar_gender,
                a.avatar_url
            FROM t_users u
            LEFT JOIN m_avatars a ON u.avatar_id = a.id
            WHERE u.id = :userId
        `;

        const [results] = await sequelize.query(query, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!results) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getUserByWallet = async (req, res) => {
    try {
        const walletAddress = req.params.wallet;
        
        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address is required'
            });
        }

        const query = `
            SELECT 
                u.id,
                u.wallet_address,
                u.property_ids,
                u.username,
                u.email,
                u.previous_position,
                u.last_position,
                u.last_room,
                u.avatar_id,
                u.last_login_time,
                u.nonce,
                u.created_at,
                u.updated_at,
                u.nft_metadata,
                a.name as avatar_name,
                a.gender as avatar_gender,
                a.avatar_url
            FROM t_users u
            LEFT JOIN m_avatars a ON u.avatar_id = a.id
            WHERE u.wallet_address = :walletAddress
        `;

        const [results] = await sequelize.query(query, {
            replacements: { walletAddress },
            type: sequelize.QueryTypes.SELECT
        });

        if (!results) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error fetching user by wallet:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getUserWithWallets = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const query = `
            SELECT 
                u.id,
                u.wallet_address as primary_wallet,
                u.property_ids,
                u.username,
                u.email,
                u.previous_position,
                u.last_position,
                u.last_room,
                u.avatar_id,
                u.last_login_time,
                u.nonce,
                u.created_at,
                u.updated_at,
                u.nft_metadata,
                a.name as avatar_name,
                a.gender as avatar_gender,
                a.avatar_url,
                GROUP_CONCAT(uw.wallet_address) as additional_wallets
            FROM t_users u
            LEFT JOIN m_avatars a ON u.avatar_id = a.id
            LEFT JOIN \`t_user-wallets\` uw ON u.id = uw.user_id
            WHERE u.id = :userId
            GROUP BY u.id
        `;

        const [results] = await sequelize.query(query, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!results) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Parse additional wallets
        if (results.additional_wallets) {
            results.additional_wallets = results.additional_wallets.split(',');
        } else {
            results.additional_wallets = [];
        }

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error fetching user with wallets:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getUserWithItems = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const query = `
            SELECT 
                u.id,
                u.wallet_address,
                u.property_ids,
                u.username,
                u.email,
                u.previous_position,
                u.last_position,
                u.last_room,
                u.avatar_id,
                u.last_login_time,
                u.nonce,
                u.created_at,
                u.updated_at,
                u.nft_metadata,
                a.name as avatar_name,
                a.gender as avatar_gender,
                a.avatar_url,
                JSON_ARRAYAGG(
                    CASE 
                        WHEN i.id IS NOT NULL THEN
                            JSON_OBJECT(
                                'item_id', i.id,
                                'item_name', i.name,
                                'item_link', i.link,
                                'thumbnail', i.thumbnail,
                                'gender', i.gender,
                                'type', i.type,
                                'parts_hided', i.parts_hided,
                                'stat_jump', i.stat_jump,
                                'stat_move', i.stat_move,
                                'pattern', i.pattern,
                                'set_number', i.set_number,
                                'owner', i.owner,
                                'is_selling', i.is_selling,
                                'chain_id', i.chain_id
                            )
                        ELSE NULL
                    END
                ) as user_items
            FROM t_users u
            LEFT JOIN m_avatars a ON u.avatar_id = a.id
            LEFT JOIN \`t_user-items\` ui ON u.id = ui.user_id
            LEFT JOIN m_items i ON ui.item_id = i.id
            WHERE u.id = :userId
            GROUP BY u.id
        `;

        const [results] = await sequelize.query(query, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!results) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Filter out null items
        if (results.user_items) {
            results.user_items = results.user_items.filter(item => item !== null);
        } else {
            results.user_items = [];
        }

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error fetching user with items:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getUserNFTs = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // First get user's wallet addresses
        const userWalletsQuery = `
            SELECT wallet_address as primary_wallet,
                   GROUP_CONCAT(uw.wallet_address) as additional_wallets
            FROM t_users u
            LEFT JOIN \`t_user-wallets\` uw ON u.id = uw.user_id
            WHERE u.id = :userId
            GROUP BY u.id
        `;

        const [userWallets] = await sequelize.query(userWalletsQuery, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!userWallets) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Collect all wallet addresses
        let walletAddresses = [];
        if (userWallets.primary_wallet) {
            walletAddresses.push(userWallets.primary_wallet);
        }
        if (userWallets.additional_wallets) {
            walletAddresses = walletAddresses.concat(userWallets.additional_wallets.split(','));
        }

        if (walletAddresses.length === 0) {
            return res.json({
                success: true,
                data: {
                    user_id: userId,
                    nfts: []
                }
            });
        }

        // Get NFTs for all user wallets
        const nftQuery = `
            SELECT 
                n.id,
                n.token_address,
                n.token_id,
                n.chain_id,
                n.token_uri,
                n.metadata,
                n.owner,
                n.is_sync_metadata,
                n.created_at,
                n.last_sync,
                n.is_for_rent,
                n.rent_price,
                n.rent_period_days,
                n.tenant_wallet,
                n.rent_due_at,
                n.grace_until,
                n.rental_status,
                nt.name as nft_type_name,
                nt.symbol as nft_type_symbol
            FROM t_nfts n
            LEFT JOIN m_nft_types nt ON n.token_address = nt.token_address AND n.chain_id = nt.chain_id
            WHERE n.owner IN (${walletAddresses.map(() => '?').join(',')})
            ORDER BY n.created_at DESC
        `;

        const nfts = await sequelize.query(nftQuery, {
            replacements: walletAddresses,
            type: sequelize.QueryTypes.SELECT
        });

        res.json({
            success: true,
            data: {
                user_id: userId,
                wallet_addresses: walletAddresses,
                nfts: nfts
            }
        });

    } catch (error) {
        console.error('Error fetching user NFTs:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const query = `
            SELECT 
                u.id,
                u.wallet_address,
                u.username,
                u.email,
                u.last_login_time,
                u.created_at,
                a.name as avatar_name,
                a.gender as avatar_gender
            FROM t_users u
            LEFT JOIN m_avatars a ON u.avatar_id = a.id
            ORDER BY u.created_at DESC
            LIMIT :limit OFFSET :offset
        `;

        const countQuery = `SELECT COUNT(*) as total FROM t_users`;

        const [users, [countResult]] = await Promise.all([
            sequelize.query(query, {
                replacements: { limit, offset },
                type: sequelize.QueryTypes.SELECT
            }),
            sequelize.query(countQuery, {
                type: sequelize.QueryTypes.SELECT
            })
        ]);

        const total = countResult.total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            success: true,
            data: {
                users: users,
                pagination: {
                    current_page: page,
                    total_pages: totalPages,
                    total_users: total,
                    per_page: limit
                }
            }
        });

    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};