
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
    res.render('register')
}

const otpVerify=(req,res)=>{
    res.render('sendOtp')
}

const vendorPassword = (req, res ,next) => {
    res.render('vendorPassword');
}


//devloper Dashboard
const vendorDash=(req,res)=>{
    res.render('developer/vendorDash')
}

const developerDash=(req,res)=>{
    res.render('developer/developerDash')
}

const technologyDash=(req,res)=>{
    res.render('developer/technologyDash')
}


// vendor Dashboard

const vendorDashboard = (req, res, next) => {
    res.render('vendor/vendordashboard');

}

const vendorDeveloper=(req,res)=>{
    res.render('vendor/vendorDeveloper')
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