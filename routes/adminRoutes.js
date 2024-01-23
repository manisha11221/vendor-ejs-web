// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/adminMiddleware')

// Admin login route
router.post('/login', adminController.adminLogin);
router.post('/logout',auth,adminController.logoutAdmin);
router.get('/search-data',auth,adminController.searchData)
module.exports = router;
