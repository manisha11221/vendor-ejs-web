const express = require('express');

const {indexView,adminLogin, otpSend, otpVerify} = require('../controllers/homeEjsController');
const router = express.Router();


router.get('/admin-dashboard', indexView);
router.get('/login', adminLogin);
router.get('/vendor-register', otpSend);
router.get('/vendor-otpVerify',otpVerify);


module.exports = {
    routes: router
}