
const indexView = (req, res, next) => {
    res.render('index');
}
const adminLogin = (req, res, next) => {
    res.render('admin-login');
}



module.exports = {
    indexView,
    adminLogin
}