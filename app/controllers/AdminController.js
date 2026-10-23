const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Sequelize, Op } = require('sequelize');
const { 
    User, 
    Avatar, 
    Item, 
    NFT, 
    UserItem, 
    SellingNFT, 
    UserWallet, 
    NFTType, 
    Session 
} = require('../models');

class AdminController {
    /**
     * Admin signup
     * POST /api/admin/signup
     */
    static async signup(req, res) {
        try {
            const { username, password, email } = req.body;

            // Validate input
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({
                where: {
                    username: username
                }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Username already exists'
                });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new user
            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                email: email || null,
                role: 'admin',
                is_active: true
            });

            return res.status(201).json({
                success: true,
                message: 'Admin account created successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            });

        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Admin login with static credentials
     * POST /api/admin/login
     */
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            // Find admin user by username
            const adminUser = await User.findOne({
                where: {
                    username: username
                }
            });

            if (!adminUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid admin credentials'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, adminUser.password);
            
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid admin credentials'
                });
            }

            // Check if user has admin privileges
            if (!adminUser.admin_role || adminUser.admin_role === 'user') {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin privileges required.'
                });
            }

            // Generate session token
            const sessionToken = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            // Create session
            await Session.create({
                sid: sessionToken,
                userId: adminUser.id.toString(),
                expires: expiresAt,
                data: JSON.stringify({
                    userId: adminUser.id,
                    username: adminUser.username,
                    isAdmin: true
                })
            });

            // Set session in request
            req.session.userId = adminUser.id;
            req.session.username = adminUser.username;
            req.session.isAdmin = true;

            return res.status(200).json({
                success: true,
                message: 'Admin login successful',
                data: {
                    user: {
                        id: adminUser.id,
                        username: adminUser.username,
                        email: adminUser.email,
                        admin_role: adminUser.admin_role,
                        isAdmin: true
                    },
                    session: {
                        token: sessionToken,
                        expiresAt: expiresAt
                    }
                }
            });

        } catch (error) {
            console.error('Admin login error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during admin login'
            });
        }
    }

    /**
     * Admin logout
     * POST /api/admin/logout
     */
    static async logout(req, res) {
        try {
            const userId = req.session.userId;

            if (userId) {
                // Delete all sessions for this user
                await Session.destroy({
                    where: {
                        user_id: userId
                    }
                });
            }

            // Destroy session
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                }
            });

            return res.status(200).json({
                success: true,
                message: 'Admin logout successful'
            });

        } catch (error) {
            console.error('Admin logout error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during admin logout'
            });
        }
    }

    /**
     * Verify admin session
     * GET /api/admin/verify
     */
    static async verifySession(req, res) {
        try {
            const userId = req.session.userId;
            const isAdmin = req.session.isAdmin;

            if (!userId || !isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'No valid admin session found'
                });
            }

            // Get user details
            const adminUser = await User.findByPk(userId);

            if (!adminUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin user not found'
                });
            }

            // Verify admin status using database admin_role field
            if (!adminUser.admin_role || adminUser.admin_role === 'user') {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin privileges required.'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Valid admin session',
                data: {
                    user: {
                        id: adminUser.id,
                        username: adminUser.username,
                        email: adminUser.email,
                        isAdmin: true
                    }
                }
            });

        } catch (error) {
            console.error('Admin session verification error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during session verification'
            });
        }
    }

    /**
     * Get admin dashboard data
     * GET /api/admin/dashboard
     */
    /**
     * Get comprehensive dashboard statistics
     * GET /api/admin/dashboard/stats
     */
    static async getDashboardStats(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            // Get comprehensive statistics
            const [
                totalUsers,
                totalAvatars,
                totalItems,
                totalNFTs,
                totalSellingNFTs,
                activeUsers,
                totalWallets,
                totalNFTTypes
            ] = await Promise.all([
                User.count(),
                Avatar.count(),
                Item.count(),
                NFT.count(),
                SellingNFT.count({ where: { is_closed: false } }),
                User.count({ where: { last_login_time: { [Op.not]: null } } }),
                UserWallet.count(),
                NFTType.count()
            ]);

            // Calculate revenue from selling NFTs (convert from wei to ETH)
            const totalRevenue = await SellingNFT.sum('price', {
                where: { is_closed: true, buyer: { [Op.not]: null } }
            });

            return res.status(200).json({
                success: true,
                data: {
                    totalUsers,
                    totalAvatars,
                    totalItems,
                    totalNFTs,
                    activeListings: totalSellingNFTs,
                    activeUsers,
                    totalWallets,
                    totalNFTTypes,
                    totalRevenue: totalRevenue || 0,
                    lastUpdated: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Dashboard stats error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching dashboard stats'
            });
        }
    }

    /**
     * Get real-time statistics
     * GET /api/admin/dashboard/realtime
     */
    static async getRealtimeStats(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            // Get recent activity (last 24 hours)
            const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
            
            const [
                newUsersToday,
                newNFTsToday,
                newListingsToday,
                salesCompletedToday
            ] = await Promise.all([
                User.count({ where: { created_at: { [Op.gte]: last24Hours } } }),
                NFT.count({ where: { created_at: { [Op.gte]: last24Hours.getTime() / 1000 } } }),
                SellingNFT.count({ where: { start_time: { [Op.gte]: last24Hours.getTime() / 1000 } } }),
                SellingNFT.count({ 
                    where: { 
                        is_closed: true,
                        buyer: { [Op.not]: null },
                        last_sync: { [Op.gte]: last24Hours.getTime() / 1000 }
                    } 
                })
            ]);

            return res.status(200).json({
                success: true,
                data: {
                    newUsersToday,
                    newNFTsToday,
                    newListingsToday,
                    salesCompletedToday,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Realtime stats error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching realtime stats'
            });
        }
    }

    /**
     * Get all users with their details
     * GET /api/admin/users
     */
    static async getAllUsers(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            const users = await User.findAll({
                include: [
                    {
                        model: Avatar,
                        as: 'avatar',
                        attributes: ['id', 'name', 'gender', 'avatar_url']
                    },
                    {
                        model: UserWallet,
                        as: 'wallets',
                        attributes: ['wallet_address']
                    }
                ],
                attributes: [
                    'id', 'username', 'email', 'wallet_address', 
                    'last_room', 'avatar_id', 'last_login_time', 
                    'created_at', 'updated_at'
                ],
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: users
            });

        } catch (error) {
            console.error('Get users error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching users'
            });
        }
    }

    /**
     * Get all NFTs with metadata
     * GET /api/admin/nfts
     */
    static async getAllNFTs(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            const nfts = await NFT.findAll({
                include: [
                    {
                        model: SellingNFT,
                        as: 'selling',
                        required: false,
                        attributes: ['price', 'is_closed', 'seller', 'buyer']
                    }
                ],
                order: [['created_at', 'DESC']],
                limit: 1000 // Limit to prevent overwhelming response
            });

            return res.status(200).json({
                success: true,
                data: nfts
            });

        } catch (error) {
            console.error('Get NFTs error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching NFTs'
            });
        }
    }

    /**
     * Get marketplace analytics
     * GET /api/admin/marketplace/analytics
     */
    static async getMarketplaceAnalytics(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            // Get marketplace statistics
            const [
                totalListings,
                activeListings,
                completedSales,
                totalVolume,
                averagePrice,
                topSellers
            ] = await Promise.all([
                SellingNFT.count(),
                SellingNFT.count({ where: { is_closed: false } }),
                SellingNFT.count({ where: { is_closed: true, buyer: { [Op.not]: null } } }),
                SellingNFT.sum('price', { where: { is_closed: true, buyer: { [Op.not]: null } } }),
                SellingNFT.findOne({
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('price')), 'avgPrice']],
                    where: { is_closed: true, buyer: { [Op.not]: null } }
                }),
                SellingNFT.findAll({
                    attributes: [
                        'seller',
                        [Sequelize.fn('COUNT', Sequelize.col('id')), 'salesCount'],
                        [Sequelize.fn('SUM', Sequelize.col('price')), 'totalRevenue']
                    ],
                    where: { is_closed: true, buyer: { [Op.not]: null } },
                    group: ['seller'],
                    order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
                    limit: 10
                })
            ]);

            return res.status(200).json({
                success: true,
                data: {
                    totalListings,
                    activeListings,
                    completedSales,
                    totalVolume: totalVolume || 0,
                    averagePrice: averagePrice?.dataValues?.avgPrice || 0,
                    topSellers
                }
            });

        } catch (error) {
            console.error('Marketplace analytics error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching marketplace analytics'
            });
        }
    }

    /**
     * Get user activity analytics
     * GET /api/admin/users/analytics
     */
    static async getUserAnalytics(req, res) {
        try {
            // Verify admin session
            if (!req.session.userId || !req.session.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin authentication required'
                });
            }

            // Get user registration trends (last 30 days)
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            
            const userRegistrationTrend = await User.findAll({
                attributes: [
                    [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                ],
                where: {
                    created_at: { [Op.gte]: thirtyDaysAgo }
                },
                group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
                order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'ASC']]
            });

            // Get avatar distribution
            const avatarDistribution = await User.findAll({
                attributes: [
                    'avatar_id',
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                ],
                include: [
                    {
                        model: Avatar,
                        as: 'avatar',
                        attributes: ['name', 'gender']
                    }
                ],
                group: ['avatar_id'],
                order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: {
                    registrationTrend: userRegistrationTrend,
                    avatarDistribution
                }
            });

        } catch (error) {
            console.error('User analytics error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching user analytics'
            });
        }
    }

    /**
     * Middleware to check admin authentication
     */
    static requireAdmin(req, res, next) {
        if (!req.session.userId || !req.session.isAdmin) {
            return res.status(401).json({
                success: false,
                message: 'Admin authentication required'
            });
        }
        next();
    }

    /**
     * Update user admin role (superadmin only)
     * PUT /api/admin/users/:userId/role
     */
    static async updateUserRole(req, res) {
        try {
            const { userId } = req.params;
            const { admin_role } = req.body;
            const currentUserId = req.session.userId;

            // Get current admin user to check permissions
            const currentAdmin = await User.findByPk(currentUserId);
            if (!currentAdmin || currentAdmin.admin_role !== 'superadmin') {
                return res.status(403).json({
                    success: false,
                    message: 'Only superadmin can modify user roles'
                });
            }

            // Validate admin_role value
            const validRoles = ['user', 'admin', 'superadmin'];
            if (!validRoles.includes(admin_role)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid admin role. Must be: user, admin, or superadmin'
                });
            }

            // Find target user
            const targetUser = await User.findByPk(userId);
            if (!targetUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Prevent self-demotion from superadmin
            if (currentUserId == userId && currentAdmin.admin_role === 'superadmin' && admin_role !== 'superadmin') {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot demote yourself from superadmin role'
                });
            }

            // Update user role
            await targetUser.update({ admin_role });

            return res.status(200).json({
                success: true,
                message: 'User role updated successfully',
                data: {
                    user: {
                        id: targetUser.id,
                        username: targetUser.username,
                        email: targetUser.email,
                        admin_role: targetUser.admin_role
                    }
                }
            });

        } catch (error) {
            console.error('Update user role error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while updating user role'
            });
        }
    }

    /**
     * Get all users with their admin roles and property information
     * GET /api/admin/users-with-roles
     */
    static async getUsersWithRoles(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'admin_role', 'property_ids', 'last_login_time', 'created_at'],
                order: [['created_at', 'DESC']]
            });

            // Process users to include property information
            const processedUsers = users.map(user => {
                let propertyIds = [];
                
                // Parse property_ids if it exists and is valid JSON
                if (user.property_ids) {
                    try {
                        propertyIds = JSON.parse(user.property_ids);
                        if (!Array.isArray(propertyIds)) {
                            propertyIds = [];
                        }
                    } catch (error) {
                        console.warn(`Invalid property_ids JSON for user ${user.id}:`, user.property_ids);
                        propertyIds = [];
                    }
                }

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    admin_role: user.admin_role,
                    property_ids: propertyIds,
                    property_count: propertyIds.length,
                    last_login_time: user.last_login_time,
                    created_at: user.created_at
                };
            });

            return res.status(200).json({
                success: true,
                data: processedUsers,
                // Include static property range for reference
                available_property_range: {
                    min: 1,
                    max: 1000,
                    total: 1000
                }
            });

        } catch (error) {
            console.error('Get users with roles error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching users with roles'
            });
        }
    }

    /**
     * Get all properties/NFTs with static range 1-1000
     * GET /api/admin/properties
     */
    static async getAllProperties(req, res) {
        try {
            // Generate static property range 1-1000
            const properties = [];
            for (let i = 1; i <= 1000; i++) {
                properties.push({
                    id: i,
                    token_address: `0x${i.toString(16).padStart(40, '0')}`,
                    token_id: i,
                    metadata: {
                        name: `Property #${i}`,
                        description: `Metaverse property number ${i}`,
                        type: i <= 100 ? 'premium' : i <= 500 ? 'standard' : 'basic',
                        location: `Sector ${Math.ceil(i / 100)}`
                    },
                    is_available: true
                });
            }

            return res.status(200).json({
                success: true,
                data: properties,
                total: properties.length
            });

        } catch (error) {
            console.error('Get all properties error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching properties'
            });
        }
    }

    /**
     * Get available properties for assignment (static range 1-1000)
     * GET /api/admin/properties/available
     */
    static async getAvailableProperties(req, res) {
        try {
            // Get all users to check which properties are assigned
            const users = await User.findAll({
                attributes: ['property_ids']
            });

            // Collect all assigned property IDs
            const assignedPropertyIds = new Set();
            users.forEach(user => {
                if (user.property_ids) {
                    try {
                        const propertyIds = JSON.parse(user.property_ids);
                        if (Array.isArray(propertyIds)) {
                            propertyIds.forEach(id => assignedPropertyIds.add(id));
                        }
                    } catch (error) {
                        console.warn(`Invalid property_ids JSON for user:`, user.property_ids);
                    }
                }
            });

            // Generate available properties (1-1000 minus assigned ones)
            const availableProperties = [];
            for (let i = 1; i <= 1000; i++) {
                if (!assignedPropertyIds.has(i)) {
                    availableProperties.push({
                        id: i,
                        token_address: `0x${i.toString(16).padStart(40, '0')}`,
                        token_id: i,
                        metadata: {
                            name: `Property #${i}`,
                            description: `Metaverse property number ${i}`,
                            type: i <= 100 ? 'premium' : i <= 500 ? 'standard' : 'basic',
                            location: `Sector ${Math.ceil(i / 100)}`
                        },
                        is_available: true
                    });
                }
            }

            return res.status(200).json({
                success: true,
                data: availableProperties,
                total: availableProperties.length,
                assigned_count: assignedPropertyIds.size
            });

        } catch (error) {
            console.error('Get available properties error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching available properties'
            });
        }
    }

    /**
     * Get properties assigned to a specific user
     * GET /api/admin/users/:userId/properties
     */
    static async getUserProperties(req, res) {
        try {
            const { userId } = req.params;

            // Find the user
            const user = await User.findByPk(userId, {
                attributes: ['id', 'username', 'property_ids']
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            let userProperties = [];
            
            // Parse user's property_ids
            if (user.property_ids) {
                try {
                    const propertyIds = JSON.parse(user.property_ids);
                    if (Array.isArray(propertyIds)) {
                        // Generate property objects for assigned IDs
                        userProperties = propertyIds.map(id => ({
                            id: id,
                            token_address: `0x${id.toString(16).padStart(40, '0')}`,
                            token_id: id,
                            metadata: {
                                name: `Property #${id}`,
                                description: `Metaverse property number ${id}`,
                                type: id <= 100 ? 'premium' : id <= 500 ? 'standard' : 'basic',
                                location: `Sector ${Math.ceil(id / 100)}`
                            },
                            assigned_to_user: userId
                        }));
                    }
                } catch (error) {
                    console.warn(`Invalid property_ids JSON for user ${userId}:`, user.property_ids);
                }
            }

            return res.status(200).json({
                success: true,
                data: userProperties,
                user: {
                    id: user.id,
                    username: user.username
                },
                total: userProperties.length
            });

        } catch (error) {
            console.error('Get user properties error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching user properties'
            });
        }
    }

    /**
     * Assign a property to a user
     * POST /api/admin/users/:userId/properties
     */
    static async assignPropertyToUser(req, res) {
        try {
            const { userId } = req.params;
            const { property_id } = req.body;

            if (!property_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Property ID is required'
                });
            }

            // Validate property ID is within range
            if (property_id < 1 || property_id > 1000) {
                return res.status(400).json({
                    success: false,
                    message: 'Property ID must be between 1 and 1000'
                });
            }

            // Check if user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Get current property IDs
            let currentPropertyIds = [];
            if (user.property_ids) {
                try {
                    currentPropertyIds = JSON.parse(user.property_ids);
                    if (!Array.isArray(currentPropertyIds)) {
                        currentPropertyIds = [];
                    }
                } catch (e) {
                    currentPropertyIds = [];
                }
            }

            // Check if property is already assigned to this user
            if (currentPropertyIds.includes(property_id)) {
                return res.status(409).json({
                    success: false,
                    message: 'Property is already assigned to this user'
                });
            }

            // Check if property is assigned to any other user
            const allUsers = await User.findAll({
                where: {
                    id: { [Op.ne]: userId },
                    property_ids: { [Op.ne]: null }
                },
                attributes: ['id', 'username', 'property_ids']
            });

            for (const otherUser of allUsers) {
                if (otherUser.property_ids) {
                    try {
                        const otherUserPropertyIds = JSON.parse(otherUser.property_ids);
                        if (Array.isArray(otherUserPropertyIds) && otherUserPropertyIds.includes(property_id)) {
                            return res.status(400).json({
                                success: false,
                                message: `Property #${property_id} is already assigned to user ${otherUser.username}`
                            });
                        }
                    } catch (error) {
                        console.warn(`Invalid property_ids JSON for user ${otherUser.id}:`, otherUser.property_ids);
                    }
                }
            }

            // Add property to user's property list
            currentPropertyIds.push(property_id);
            
            await user.update({
                property_ids: JSON.stringify(currentPropertyIds)
            });

            // Generate property objects for response
            const updatedProperties = currentPropertyIds.map(id => ({
                id: id,
                token_address: `0x${id.toString(16).padStart(40, '0')}`,
                token_id: id,
                metadata: {
                    name: `Property #${id}`,
                    description: `Metaverse property number ${id}`,
                    type: id <= 100 ? 'premium' : id <= 500 ? 'standard' : 'basic',
                    location: `Sector ${Math.ceil(id / 100)}`
                },
                assigned_to_user: userId
            }));

            return res.status(200).json({
                success: true,
                message: `Property #${property_id} assigned to user ${user.username}`,
                data: {
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    assignedProperties: updatedProperties
                }
            });

        } catch (error) {
            console.error('Assign property error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while assigning property'
            });
        }
    }

    /**
     * Remove a property from a user
     * DELETE /api/admin/users/:userId/properties/:propertyId
     */
    static async removePropertyFromUser(req, res) {
        try {
            const { userId, propertyId } = req.params;

            // Check if user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Get current property IDs
            let currentPropertyIds = [];
            if (user.property_ids) {
                try {
                    currentPropertyIds = JSON.parse(user.property_ids);
                    if (!Array.isArray(currentPropertyIds)) {
                        currentPropertyIds = [];
                    }
                } catch (e) {
                    currentPropertyIds = [];
                }
            }

            // Check if property is assigned to this user
            const propertyIndex = currentPropertyIds.indexOf(parseInt(propertyId));
            if (propertyIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Property is not assigned to this user'
                });
            }

            // Remove property from user's property list
            currentPropertyIds.splice(propertyIndex, 1);
            
            await user.update({
                property_ids: JSON.stringify(currentPropertyIds)
            });

            // Get updated user properties
            const updatedProperties = currentPropertyIds.length > 0 
                ? await NFT.findAll({
                    where: {
                        id: { [Op.in]: currentPropertyIds }
                    },
                    order: [['id', 'ASC']]
                })
                : [];

            return res.status(200).json({
                success: true,
                message: `Property #${propertyId} removed from user ${user.username}`,
                data: {
                    user_id: userId,
                    property_id: propertyId,
                    total_properties: currentPropertyIds.length
                }
            });

        } catch (error) {
            console.error('Remove property error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while removing property'
            });
        }
    }

    /**
     * Search properties by term (static range 1-1000)
     * GET /api/admin/properties/search?q=term
     */
    static async searchProperties(req, res) {
        try {
            const { q: searchTerm } = req.query;

            if (!searchTerm) {
                return res.status(400).json({
                    success: false,
                    message: 'Search term is required'
                });
            }

            // Generate all properties and filter by search term
            const allProperties = [];
            for (let i = 1; i <= 1000; i++) {
                const property = {
                    id: i,
                    token_address: `0x${i.toString(16).padStart(40, '0')}`,
                    token_id: i,
                    metadata: {
                        name: `Property #${i}`,
                        description: `Metaverse property number ${i}`,
                        type: i <= 100 ? 'premium' : i <= 500 ? 'standard' : 'basic',
                        location: `Sector ${Math.ceil(i / 100)}`
                    },
                    is_available: true
                };

                // Search in property ID, name, type, or location
                const searchString = searchTerm.toLowerCase();
                const matchesId = i.toString().includes(searchString);
                const matchesName = property.metadata.name.toLowerCase().includes(searchString);
                const matchesType = property.metadata.type.toLowerCase().includes(searchString);
                const matchesLocation = property.metadata.location.toLowerCase().includes(searchString);

                if (matchesId || matchesName || matchesType || matchesLocation) {
                    allProperties.push(property);
                }
            }

            return res.status(200).json({
                success: true,
                data: allProperties,
                total: allProperties.length,
                search_term: searchTerm
            });

        } catch (error) {
            console.error('Search properties error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while searching properties'
            });
        }
    }
}

module.exports = AdminController;