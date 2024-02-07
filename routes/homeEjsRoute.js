const express = require('express');
const auth = require('../middlewares/adminMiddleware');

const {loadAuth,successGoogleLogin,failureGoogleLogin,adminLogin, otpSend, otpVerify,vendorPassword,vendorDashboard,adminDash,vendorDash,developerDash,technologyDash,vendorDeveloper,vendorTechnology,editProfile,viewProfile} = require('../controllers/homeEjsController');
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


const passport = require('passport');
require('../passport');

router.use(passport.initialize());
router.use(passport.session());


router.get('/auth', loadAuth);

// Auth 
router.get('/auth/google', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

// Auth Callback 
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    }));

// Success 
router.get('/success', successGoogleLogin);

// failure 
router.get('/failure', failureGoogleLogin);


module.exports = {
    routes: router
}