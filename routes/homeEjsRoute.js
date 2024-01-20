const express = require('express');

const {indexView,adminLogin,sendOtp} = require('../controllers/homeEjsController');
const router = express.Router();


router.get('/dashboard', indexView);
router.get('/admin-login', adminLogin);
router.get('/otp-send', sendOtp);


module.exports = {
    routes: router
}