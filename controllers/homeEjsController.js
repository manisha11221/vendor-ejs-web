
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

module.exports = {
    indexView,
    adminLogin,
    otpSend,
    otpVerify
}