const express = require('express');

const {indexView,adminLogin, otpSend, otpVerify,vendorPassword,vendorDashboard} = require('../controllers/homeEjsController');
const router = express.Router();


router.get('/admin-dashboard', indexView);
router.get('/login', adminLogin);
router.get('/vendor-register', otpSend);
router.get('/vendor-otpVerify',otpVerify);
router.get('/vendor-password/:vendorId', vendorPassword);
router.get('/vendor-dashboard/', vendorDashboard);


module.exports = {
    routes: router
}