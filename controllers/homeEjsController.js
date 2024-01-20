
const indexView = (req, res, next) => {
    res.render('index');
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


const vendorDashboard = (req, res ,next) => {
    res.render('vendorDashboard');
}

module.exports = {
    indexView,
    adminLogin,
    otpSend,
    otpVerify,
    vendorPassword,
    vendorDashboard
}