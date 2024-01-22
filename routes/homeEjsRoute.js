const express = require('express');

const {adminDashboard,adminLogin, otpSend, otpVerify,vendorPassword,vendorDashboard,adminDash,vendorDash,developerDash,technologyDash,vendorDeveloper} = require('../controllers/homeEjsController');
const router = express.Router();

// router.get('/dashboard', adminDashboard);
router.get('/dashboard', vendorDashboard);
router.get('/login', adminLogin);
router.get('/vendor-register', otpSend);
router.get('/vendor-otpVerify',otpVerify);
router.get('/vendor-password/:vendorId', vendorPassword);

router.get('/adminDash',adminDash);
router.get('/vendorDash',vendorDash);
router.get('/developerDash',developerDash);
router.get('/technologyDash',technologyDash);

// vendor 
router.get('/vendor-dashboard', vendorDashboard);
router.get('/vendor-developer', vendorDeveloper);


module.exports = {
    routes: router
}