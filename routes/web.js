const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const UserController = require('../app/controllers/UserController');
const AdminController = require('../app/controllers/AdminController');
const LiveStreamController = require('../app/controllers/LiveStreamController');
const UserStreamAdminController = require('../app/controllers/UserStreamAdminController');
const StreamerApplicationController = require('../app/controllers/StreamerApplicationController');
const GiftStickerController = require('../app/controllers/GiftStickerController');

router.get('/', HomeController.homePage);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

// User API Routes
router.get('/api/users', UserController.getAllUsers);
router.get('/api/users/:id', UserController.getUserById);
router.get('/api/users/wallet/:wallet', UserController.getUserByWallet);
router.get('/api/users/:id/wallets', UserController.getUserWithWallets);
router.get('/api/users/:id/items', UserController.getUserWithItems);
router.get('/api/users/:id/nfts', UserController.getUserNFTs);

// Admin API Routes
router.post('/api/admin/signup', AdminController.signup);
router.post('/api/admin/login', AdminController.login);
router.post('/api/admin/logout', AdminController.logout);
router.get('/api/admin/verify', AdminController.verifySession);

// Metaverse Dashboard API Routes
router.get('/api/admin/dashboard/stats', AdminController.getDashboardStats);
router.get('/api/admin/dashboard/realtime', AdminController.getRealtimeStats);
router.get('/api/admin/users', AdminController.getAllUsers);
router.get('/api/admin/users-with-roles', AdminController.requireAdmin, AdminController.getUsersWithRoles);
router.put('/api/admin/users/:userId/role', AdminController.requireAdmin, AdminController.updateUserRole);
router.get('/api/admin/nfts', AdminController.getAllNFTs);
router.get('/api/admin/marketplace/analytics', AdminController.getMarketplaceAnalytics);
router.get('/api/admin/users/analytics', AdminController.getUserAnalytics);

// Property Management API Routes
router.get('/api/admin/properties', AdminController.requireAdmin, AdminController.getAllProperties);
router.get('/api/admin/properties/available', AdminController.requireAdmin, AdminController.getAvailableProperties);
router.get('/api/admin/properties/search', AdminController.requireAdmin, AdminController.searchProperties);
router.get('/api/admin/users/:userId/properties', AdminController.requireAdmin, AdminController.getUserProperties);
router.post('/api/admin/users/:userId/properties', AdminController.requireAdmin, AdminController.assignPropertyToUser);
router.delete('/api/admin/users/:userId/properties/:propertyId', AdminController.requireAdmin, AdminController.removePropertyFromUser);

// Live Stream Management API Routes
router.get('/api/admin/livestreams', AdminController.requireAdmin, LiveStreamController.getAllLiveStreams);
router.get('/api/admin/livestreams/stats', AdminController.requireAdmin, LiveStreamController.getLiveStreamStats);
router.get('/api/admin/livestreams/:id', AdminController.requireAdmin, LiveStreamController.getLiveStreamById);
router.post('/api/admin/livestreams', AdminController.requireAdmin, LiveStreamController.createLiveStream);
router.put('/api/admin/livestreams/:id', AdminController.requireAdmin, LiveStreamController.updateLiveStream);
router.delete('/api/admin/livestreams/:id', AdminController.requireAdmin, LiveStreamController.deleteLiveStream);
router.patch('/api/admin/livestreams/:id/toggle', AdminController.requireAdmin, LiveStreamController.toggleLiveStream);

// Public Live Stream API Routes (for metaverse client)
router.get('/api/livestream/active', LiveStreamController.getActiveLiveStream);

// User Stream Admin API Routes
router.get('/api/admin/user-streams', AdminController.requireAdmin, UserStreamAdminController.getAllUserStreams);
router.get('/api/admin/user-streams/stats', AdminController.requireAdmin, UserStreamAdminController.getUserStreamStats);
router.get('/api/admin/user-streams/:id', AdminController.requireAdmin, UserStreamAdminController.getUserStreamById);
router.patch('/api/admin/user-streams/:id/status', AdminController.requireAdmin, UserStreamAdminController.updateStreamStatus);
router.delete('/api/admin/user-streams/:id', AdminController.requireAdmin, UserStreamAdminController.deleteUserStream);

// Streamer Application Admin API Routes
router.get('/api/admin/streamer-applications', AdminController.requireAdmin, StreamerApplicationController.getAllApplications);
router.patch('/api/admin/streamer-applications/:id/review', AdminController.requireAdmin, StreamerApplicationController.reviewApplication);

// Gift & Sticker Admin API Routes
router.get('/api/admin/gifts', AdminController.requireAdmin, GiftStickerController.getAllGifts);
router.post('/api/admin/gifts', AdminController.requireAdmin, GiftStickerController.createGift);
router.put('/api/admin/gifts/:id', AdminController.requireAdmin, GiftStickerController.updateGift);
router.delete('/api/admin/gifts/:id', AdminController.requireAdmin, GiftStickerController.deleteGift);
router.get('/api/admin/stickers', AdminController.requireAdmin, GiftStickerController.getAllStickers);
router.post('/api/admin/stickers', AdminController.requireAdmin, GiftStickerController.createSticker);
router.put('/api/admin/stickers/:id', AdminController.requireAdmin, GiftStickerController.updateSticker);
router.delete('/api/admin/stickers/:id', AdminController.requireAdmin, GiftStickerController.deleteSticker);

module.exports = router;