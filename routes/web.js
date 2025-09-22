const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const UserController = require('../app/controllers/UserController');
const AdminController = require('../app/controllers/AdminController');

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

module.exports = router;