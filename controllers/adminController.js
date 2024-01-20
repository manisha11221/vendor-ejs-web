// adminController.js

const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Vendor = require("../models/vendorModel");
const Developer = require("../models/developerModel");

exports.adminLogin = async (req, res) => {
  // Static data for simplicity
  const staticAdminData = {
    email_id: "admin@g.com",
    password: "admin123",
    role: "admin",
  };

  try {
    // Find the admin by email
    const existingAdmin = await Admin.findOne({
      email_id: staticAdminData.email_id,
    });

    // Debugging statement
    console.log("Existing Admin:", existingAdmin);

    // If an admin with the specified email does not exist, return an error
    if (!existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(
      staticAdminData.password,
      existingAdmin.password
    );

    // Debugging statement
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a new token
    const token = jwt.sign(
      { adminId: existingAdmin._id, email: existingAdmin.email_id },
      "admin-secret-key"
    );

    // Update the admin with the new token
    existingAdmin.token = token;

    // Save the updated admin to the database
    await existingAdmin.save();

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      role: existingAdmin.role,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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


