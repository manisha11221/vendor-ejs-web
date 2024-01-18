// adminController.js

const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Vendor = require("../models/vendorModel");
const Developer = require("../models/developerModel");

exports.adminLogin = async (req, res) => {
  // Static data for simplicity
  const staticAdminData = {
    email_id: "admin@example.com",
    password: "admin123",
  };

  try {
    const existingAdmin = await Admin.findOne({
      email_id: staticAdminData.email_id,
    });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin is already login" });
    }
    const hashedPassword = await bcrypt.hash(staticAdminData.password, 10);

    const newAdmin = new Admin({
      email_id: staticAdminData.email_id,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { adminId: newAdmin._id, email: newAdmin.email_id },
      "admin-secret-key"
    );
    newAdmin.token = token;

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
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


