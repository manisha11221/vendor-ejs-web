
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
    res.render('vendor/register')
}

const otpVerify=(req,res)=>{
    res.render('vendor/sendOtp')
}

const vendorPassword = (req, res ,next) => {
    res.render('vendor/vendorPassword');
}

const vendorDashboard = (req, res, next) => {
    res.render('vendor/vendor-dashboard');

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

const vendorDeveloper=(req,res)=>{
    res.render('vendorDeveloper')
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
    technologyDash,
    vendorDeveloper
}