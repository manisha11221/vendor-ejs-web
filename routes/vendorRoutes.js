// routes/vendorRoutes.js

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const auth = require('../middlewares/vendorMiddleware')
const authentication = require('../middlewares/adminMiddleware')
const multer = require('multer')
const path = require("path");
const fs = require("fs")


const publicDirectory = path.join(__dirname, '..','public');
const uploadDirectory = path.join(publicDirectory, 'uploads');

// Create the 'uploads' directory inside the 'public' folder if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Vendor request OTP route
router.post('/request-otp', vendorController.requestOTP);


// Vendor register route
router.post('/register', vendorController.verifyOTP);
router.post('/set-Password/:id', vendorController.setPassword);
router.post('/login-vendor', vendorController.loginVendor);
router.post('/edit-Profile', upload.single('resume'), vendorController.editProfile);
router.get('/view-Profile/:email',vendorController.viewProfile);
router.post('/reset-password', vendorController.resetPassword);
router.get('/get-all-Vendors', vendorController.getAllVendors);
router.get('/get-Vendors-by-id/:id', vendorController.getvendorById);
router.post('/logout-vendor',auth,vendorController.logoutVendor);
router.get('/count-Tech',auth,vendorController.countTech);
router.get('/developer-count',auth,vendorController.developerCount);


module.exports = router;
