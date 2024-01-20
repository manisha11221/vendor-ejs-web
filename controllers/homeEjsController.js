
const adminDashboard = (req, res, next) => {
    res.render('admin-dashboard');
}
const vendorDashboard = (req, res, next) => {
    res.render('vendor-dashboard');
}
const adminLogin = (req, res, next) => {
    res.render('login');
}

const otpSend=(req,res)=>{
    res.render('register')
}

const otpVerify=(req,res)=>{
    res.render('sendOtp')
}

const vendorPassword = (req, res ,next) => {
    res.render('vendorPassword');
}



const adminDash=(req,res)=>{
    res.render('adminDash')
}

const vendorDash=(req,res)=>{
    res.render('vendorDash')
}

const developerDash=(req,res)=>{
    res.render('developerDash')
}

module.exports = {
    adminDashboard,
    adminLogin,
    otpSend,
    otpVerify,
    vendorPassword,
    vendorDashboard,
    adminDash,
    vendorDash,developerDash
}