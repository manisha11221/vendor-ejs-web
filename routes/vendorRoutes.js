// routes/vendorRoutes.js

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const auth = require('../middlewares/vendorMiddleware')
const authentication = require('../middlewares/adminMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware');

  // Vendor request OTP route
router.post('/request-otp', vendorController.requestOTP);


// Vendor register route
router.post('/register', vendorController.verifyOTP);
router.post('/set-Password/:id', vendorController.setPassword);
router.post('/login-vendor', vendorController.loginVendor);
router.post('/edit-Profile',multerMiddleware.single('profilePhoto '), vendorController.editProfile);
router.get('/view-Profile/:id',multerMiddleware.single('profilePhoto '),vendorController.viewProfile)
router.post('/reset-password', vendorController.resetPassword);
router.get('/get-all-Vendors', vendorController.getAllVendors);
router.get('/get-Vendors-by-id/:id', vendorController.getvendorById);
router.post('/logout-vendor',auth,vendorController.logoutVendor);
router.get('/count-Tech',auth,vendorController.countTech);
router.post('/add-tech-by-vendor/:id',auth, vendorController.addTechByVendor);
router.get('/developer-count',auth,vendorController.developerCount);


module.exports = router;
