
//admin Route

const adminDash = (req, res) => {
    res.render('admin/adminDash');
  };
  

const adminDashboard = (req, res, next) => {
    res.render('admin-dashboard');
}

const adminLogin = (req, res, next) => {
    res.render('login');
}



//vendor dashboard
const otpSend=(req,res)=>{
    res.render('vednor/register')
}

const otpVerify=(req,res)=>{
    res.render('sendOtp')
}

const vendorPassword = (req, res ,next) => {
    res.render('vendorPassword');
}

const vendorDashboard = (req, res, next) => {
    res.render('vendor-dashboard');

}





//devloper Dashboard
const vendorDash=(req,res)=>{
    res.render('admin/developer/vendorDash')
}

const developerDash=(req,res)=>{
    res.render('admin/developer/developerDash')
}

const technologyDash=(req,res)=>{
    res.render('admin/developer/technologyDash')
}

module.exports = {
    adminDashboard,
    adminLogin,
    otpSend,
    otpVerify,
    vendorPassword,
    vendorDashboard,
    adminDash,
    vendorDash,
    developerDash,
    technologyDash
}