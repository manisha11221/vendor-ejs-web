
const indexView = (req, res, next) => {
    res.render('index');
}
const adminLogin = (req, res, next) => {
    res.render('admin-login');
}
const sendOtp = (req, res, next) => {
    res.render('otpSend');
}
module.exports = {
    indexView,
    adminLogin,
    sendOtp
}