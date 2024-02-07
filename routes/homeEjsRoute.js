const express = require('express');
const auth = require('../middlewares/adminMiddleware');

const {adminLogin, otpSend, otpVerify,vendorPassword,vendorDashboard,adminDash,vendorDash,developerDash,technologyDash,vendorDeveloper,vendorTechnology,requirements,viewProfile} = require('../controllers/homeEjsController');
const router = express.Router();


// router.get('/dashboard', vendorDashboard);
router.get('/login', adminLogin);
router.get('/vendor-register', otpSend);
router.get('/vendor-otpVerify',otpVerify);
router.get('/vendor-password/:vendorId', vendorPassword);





router.get('/adminDash',adminDash);

router.get('/vendorDash',vendorDash);
router.get('/developerDash',developerDash);
router.get('/technologyDash',technologyDash);

//vendor 
router.get('/vendor-dashboard',vendorDashboard);
router.get('/vendor-developer', vendorDeveloper);
router.get('/vendor-technology', vendorTechnology);
router.get('/view-profile', viewProfile);
router.get('/requirements', requirements);

module.exports = {
    routes: router
}