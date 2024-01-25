// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/adminMiddleware')

// Admin login route
router.post('/login', adminController.adminLogin);
router.post('/logout',auth,adminController.logoutAdmin);
router.get('/search-data',auth,adminController.searchData)
router.get('/count-Vendor',auth,adminController.countVendor)
router.get('/count-developer',auth,adminController.countDeveloper)
module.exports = router;
