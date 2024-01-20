
const indexView = (req, res, next) => {
    res.render('index');
}
const adminLogin = (req, res, next) => {
    res.render('admin-login');
}

const otpSend=(req,res)=>{
    res.render('register')
}

const otpVerify=(req,res)=>{
    res.render('sendOtp')
}

const vendorPassword=(req,res)=>{
    res.render('vendorPassword')
}

module.exports = {
    indexView,
    adminLogin,
    otpSend,
    otpVerify,vendorPassword
}