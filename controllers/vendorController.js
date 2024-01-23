// controllers/vendorController.js

const Vendor = require("../models/vendorModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Define email configuration
const emailConfig = {
  service: "gmail",
  auth: {
    user: "meetdhameliya08@gmail.com",
    pass: "hthcazjihwdvrdsq",
  },
};
const transporter = nodemailer.createTransport(emailConfig);

exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingVendor = await Vendor.findOne({ email });

    // Get the current date and time
    const currentDate = new Date();

    // Add one day to the current date
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + 1);

    // Format the expiration date to use in OTP or store it in the database
    const formattedExpirationDate = expirationDate.toISOString();

    // Generate the OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: emailConfig.auth.user,
      to: email,
      subject: "Vendor Registration OTP",
      text: `Your OTP for vendor registration is: ${otp}`,
    };

    // If the email exists, update the OTP; otherwise, save a new entry
    if (existingVendor) {
      // Update the existing vendor's OTP in the database
      existingVendor.otp = otp;
      await existingVendor.save();
    } else {
      // Save the OTP and email to the database for a new vendor
      const vendor = new Vendor({
        email,
        otp,
        password: "your-default-password",
      });
      await vendor.save();
    }

    // Send the OTP email
    await transporter.sendMail(mailOptions);

    // Specify the redirect URL in the response
    const redirectUrl = "http://yourdomain.com/vendor-otpVerify";
    res.json({ message: "OTP sent successfully", redirectUrl });
  } catch (error) {
    console.error("Request OTP Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//varify with otp
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const vendor = await Vendor.findOne({ otp });

    if (vendor) {
      // Save the vendor's ID before updating email_verification
      const vendorId = vendor._id;

      // Update the vendor's email_verification status
      vendor.email_verification = true;
      await vendor.save();
      
      // Respond with success message and vendorId
      res.json({ message: "OTP verification successful", vendorId });
    } else {
      // Respond with an error message
      res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//set-password
exports.setPassword = async (req, res) => {
  try {
    console.log("backend------------------");
    const { password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the user ID from the route parameter
    const userId = req.params.id;

    console.log("User ID:", userId);

    // Find the user document in the database based on the user ID
    const vendor = await Vendor.findById(userId);

    console.log("vendor_id", vendor.id);

    if (vendor) {
      // Update the user's password and mark as verified
      vendor.password = hashedPassword;
      vendor.email_verification = true;

      await vendor.save();

      res.json({ message: "Password set successfully after OTP verification" });
    } else {
      res.status(401).json({ message: "Invalid user ID" });
    }
  } catch (error) {
    console.error("Set Password After OTP Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    const { email, old_psw, new_psw, confirm_psw } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const isPasswordValid = await bcrypt.compare(old_psw, vendor.password);

    console.log("data", isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid old password" });
    }

    if (new_psw !== confirm_psw) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(new_psw, 10);
    vendor.password = hashedPassword;

    await vendor.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





//login the vendor
// exports.loginVendor = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the vendor with the provided email
//     const vendor = await Vendor.findOne({ email });

//     if (!vendor) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Validate the provided password
//     const isPasswordValid = await bcrypt.compare(password, vendor.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate a token for the user during login
//     const generatedToken = jwt.sign(
//       { email: vendor.email , _id: vendor._id },
//       "vendor-token",
//       { expiresIn: "1h" }
//     );

//     // Save the token to the vendor document
//     vendor.token = generatedToken;

//     // Save the updated document
//     await vendor.save();

//     res.json({ message: "Login successful", token: generatedToken });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the vendor with the provided email
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Validate the provided password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate a token for the user during login
    const generatedToken = jwt.sign(
      { email: vendor.email, _id: vendor._id, role: "vendor" }, // Include the role in the token
      "vendor-token",
    );

    // Save the token to the vendor document
    vendor.token = generatedToken;

    // Save the updated document
    await vendor.save();

    // Redirect to the vendor dashboard
    res.json({
      success: true,
      message: "Login successful",
      token: generatedToken,
      role: "vendor",
      redirectTo: "/vendor-dashboard", 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//edit_profile
exports.editProfile = async (req, res) => {
  try {
    const { email, company_name, website_link, contact, gst_number, address } =
      req.body;

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "your-secret-key");

    if (!decodedToken || decodedToken.email !== email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.company_name = company_name || vendor.company_name;
    vendor.website_link = website_link || vendor.website_link;
    vendor.contact = contact || vendor.contact;
    vendor.gst_number = gst_number || vendor.gst_number;
    vendor.address = address || vendor.address;
    await vendor.save();

    res.json({ message: "Profile updated successfully", data: vendor });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get-all-vendor
exports.getAllVendors = async (req, res) => {
  try {
    
    const vendors = await Vendor.find();

    console.log("vendor", vendors);

    res.status(200).json({ success: true, vendors });
  } catch (error) {
    console.error("Get All Vendors Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//get-vendor-by-id
exports.getvendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ vendor });
  } catch (error) {
    console.error("Get vendor by ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//count the vendor
exports.countVendor = async (req, res) => {
  try {
      const count = await Vendor.countDocuments();
      res.send(count.toString());
  } catch (error) {
    console.error("Get Vendor Count Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





//vendor logout
exports.logoutVendor = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const tokenFromRequest = req.header("Authorization");

    console.log("---",tokenFromRequest);
    // Handle missing or undefined token
    if (!tokenFromRequest) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const token = tokenFromRequest.replace("Bearer ", "").trim();

    // Find the vendor with the provided token
    const vendorUser = await Vendor.findOne({ token });


    if (!vendorUser) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Clear the token in the database
    vendorUser.token = null;
    await vendorUser.save();

    res.json({ success: true, message: "Vendor logout successful" });
    //login
  } catch (error) {
    console.error("Error during vendor logout:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

