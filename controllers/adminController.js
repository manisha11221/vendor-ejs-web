// adminController.js

const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Vendor = require("../models/vendorModel");
const Developer = require("../models/developerModel");


// exports.adminLogin = (req, res) => {
//   try {
//     const staticAdminData = {
//       email_id: "admin@g.com",
//       password: "admin",
//       role: "admin",
//     };

//     if (req.body.email_id !== staticAdminData.email_id || req.body.password !== staticAdminData.password) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { adminId: "admin-secret-key", email_id: staticAdminData.email_id },
//       process.env.JWT_SECRET || "admin-secret-key"
//     );

    
//     res.status(200).json({
//       success: true,
//       message: "Admin login successful",
//       role: staticAdminData.role,
//       token,
//     });
//   } catch (error) {
//     console.error("Error during admin login:", error);
//     res.status(500).json({ success: false, message: "Internal server error", error });
//   }
// };


exports.adminLogin = async (req, res) => {
  try {
    const staticAdminData = {
      email_id: "admin@g.com",
      password: "admin",
      role: "admin",
    };

    // Check if the provided credentials match the static admin data
    if (req.body.email_id !== staticAdminData.email_id || req.body.password !== staticAdminData.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Find or create the admin user
    let adminUser = await Admin.findOne({ email_id: staticAdminData.email_id });

    if (!adminUser) {
      adminUser = new Admin({
        email_id: staticAdminData.email_id,
        password: staticAdminData.password,
        role: staticAdminData.role,
      });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { adminId: adminUser._id, email_id: adminUser.email_id },
      process.env.JWT_SECRET || "admin-secret-key"
    );

    // Update the admin user with the new token
    adminUser.token = token;
    await adminUser.save();

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      role: adminUser.role,
      token,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};


// vendor and developer search
exports.searchData = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const vendors = await Vendor.find({
      $or: [
        { email: { $regex: searchTerm, $options: "i" } },
        { company_name: { $regex: searchTerm, $options: "i" } },
        { website_link: { $regex: searchTerm, $options: "i" } },
        { contact: { $regex: searchTerm, $options: "i" } },
        { gst_number: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
      ],
    });

    const isNumeric = !isNaN(searchTerm);

    const developers = await Developer.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { technology: { $in: [searchTerm] } },
        { experience: isNumeric ? { $eq: parseInt(searchTerm) } : null },
        { rate: isNumeric ? { $eq: parseInt(searchTerm) } : null },
      ].filter(Boolean), // Remove null values from the array
    });

    res.json({ vendors, developers });
  } catch (error) {
    console.error("Search Data Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
