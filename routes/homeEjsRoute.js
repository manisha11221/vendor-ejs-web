const express = require('express');

const {adminDashboard,adminLogin, otpSend, otpVerify,vendorPassword,vendorDashboard,adminDash,vendorDash} = require('../controllers/homeEjsController');
const router = express.Router();

// router.get('/dashboard', adminDashboard);
router.get('/dashboard', vendorDashboard);
router.get('/login', adminLogin);
router.get('/vendor-register', otpSend);
router.get('/vendor-otpVerify',otpVerify);
router.get('/vendor-password',vendorPassword);

router.get('/adminDash',adminDash);
router.get('/vendorDash',vendorDash);

module.exports = {
    routes: router
}