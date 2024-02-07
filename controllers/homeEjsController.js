
//add authentication here 

//admin Dashboard
const Vendor = require("../models/vendorModel")
  
// const adminDashboard = (req, res, next) => {
//     res.render('admin-dashboard');
// }

const loadAuth = (req, res) => {
    res.render('auth');
}

const successGoogleLogin = async (req, res) => {
    try {
        if (!req.user)
            return res.redirect('/failure');

        const userData = {
            email: req.user.email,
        };

        // Check if the user already exists in the database
        const existingUser = await Vendor.findOne({ email: userData.email });

        if (existingUser) {
            // If user already exists, redirect to the dashboard
            return res.redirect('/vendor-dashboard');
        }

        // If user does not exist, create a new user
        const newUser = new Vendor(userData);
        await newUser.save();

        console.log('User data saved successfully:', newUser);
        res.redirect('/vendor-dashboard'); // Redirect to the dashboard after saving user data
    } catch (error) {
        console.error('Error saving user data:', error);
        res.redirect('/failure');
    }
};


const failureGoogleLogin = (req, res) => {
    res.send("Error");
}


const adminDash = (req, res) => {
    res.render('admin/developer/adminDash');
  };

const adminLogin = (req, res, next) => {
    res.render('login');
}

const vendorDash=(req,res)=>{
    res.render('admin/developer/vendorDash')
}

const developerDash=(req,res)=>{
    res.render('admin/developer/developerDash')
}

const technologyDash=(req,res)=>{
    res.render('admin/developer/technologyDash')
}




//vendor dashboard
const otpSend=(req,res)=>{
    res.render('vendor/register')
}

const otpVerify=(req,res)=>{
    res.render('vendor/sendOtp')
}

const vendorPassword = (req, res ,next) => {
    res.render('vendor/vendorPassword');
}

const vendorTech = (req, res, next) => {
    res.render('vendor/vendorTech');
}
//devloper Dashboard



// vendor Dashboard

const vendorDashboard = (req, res, next) => {
    res.render('vendor/vendorDashboard');

}

const vendorDeveloper=(req,res)=>{
    res.render('vendor/vendorDeveloper')
}

const vendorTechnology=(req,res)=>{
    res.render('vendor/techDash')
}

const viewProfile=(req,res)=>{
    res.render('vendor/viewProfile')
}

const requirements=(req,res)=>{
    res.render('vendor/requirement')
}




module.exports = {
    loadAuth,
    successGoogleLogin,
    failureGoogleLogin,
    adminLogin,
    otpSend,
    otpVerify,
    vendorPassword,
    vendorDashboard,
    adminDash,
    vendorDash,
    developerDash,
    technologyDash,
    vendorDeveloper,
    vendorTechnology,
    viewProfile,
    requirements
}
