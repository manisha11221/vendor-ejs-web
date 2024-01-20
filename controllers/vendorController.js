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

    if (existingVendor) {
      // Handle the situation where the email already exists (e.g., show an error)
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: emailConfig.auth.user,
      to: email,
      subject: "Vendor Registration OTP",
      text: `Your OTP for vendor registration is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Save the OTP and email to the database
    const vendor = new Vendor({
      email,
      otp,
      password: "your-default-password",
    });

    await vendor.save();

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Request OTP Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//varify with otp
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user document in the database
    const vendor = await Vendor.findOne({ email, otp });

    if (vendor) {
      // Mark the user as verified or perform any other required action
      vendor.email_verification = true;
      await vendor.save();

      res.json({ message: "OTP verification successful" });
    } else {
      res.status(401).json({ message: "Invalid OTP or email" });
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//set-password
exports.setPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (vendor) {
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and mark as verified
      vendor.password = hashedPassword;
      vendor.email_verification = true;

      await vendor.save();

      res.json({ message: "Password set successfully" });
    } else {
      res.status(401).json({ message: "Invalid email" });
    }
  } catch (error) {
    console.error("Set Password Error:", error);
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
      return res
        .status(400)
        .json({
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
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the vendor with the provided email
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate the provided password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token for the user during login
    const generatedToken = jwt.sign(
      { email: vendor.email , _id: vendor._id },
      "vendor-token",
      { expiresIn: "1h" }
    );

    // Save the token to the vendor document
    vendor.token = generatedToken;

    
    // Save the updated document
    await vendor.save();

    res.json({ message: "Login successful", token: generatedToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//edit_profile
exports.editProfile = async (req, res) => {
  try {
    const { 
      email, 
      company_name, 
      website_link, 
      contact, 
      gst_number, 
      address 
    } = req.body;

    const 
    { 
      authorization 
    } = req.headers;

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

exports.countVendor = async (req, res) => {
  try {
    const count = await Developer.countDocuments({ vendorId: req.user.id });
    res.send(count);
  } catch (error) {

    console.error("Get Developer Count Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


