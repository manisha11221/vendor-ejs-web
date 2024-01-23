// routes/vendorRoutes.js

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const auth = require('../middlewares/vendorMiddleware')
const authentication = require('../middlewares/adminMiddleware')

// Vendor request OTP route
router.post('/request-otp', vendorController.requestOTP);

// Vendor register route
router.post('/register', vendorController.verifyOTP);
router.post('/set-Password/:id', vendorController.setPassword);
router.post('/login-vendor', vendorController.loginVendor);
router.post('/edit-Profile', vendorController.editProfile);
router.post('/reset-password', vendorController.resetPassword);
router.get('/get-all-Vendors', vendorController.getAllVendors);
router.get('/get-Vendors-by-id/:id', vendorController.getvendorById);
router.get('/count-vendor', authentication,vendorController.countVendor);
router.post('/logout-vendor',auth,vendorController.logoutVendor);

module.exports = router;
