const Developer = require("../models/developerModel");
const vendor = require("../models/vendorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.addDeveloper = async (req, res) => {
  try {
    const { name, experience, technology, resume, available, rate } = req.body;

    const developer = new Developer({
      name,
      experience,
      technology,
      resume,
      available,
      rate,
      vendorId: req.user.id,
    });

    await developer.save();

    res.json({ message: "Developer created successfully", developer });
  } catch (error) {
    console.error("Create Developer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get by id
exports.getDeveloperById = async (req, res) => {
  try {
    const developerId = req.params.id;
    const developer = await Developer.findById(developerId);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.json({ developer });
  } catch (error) {
    console.error("Get Developer by ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all
exports.getDeveloperAll = async (req, res) => {
  try {
    const developers = await Developer.find();

    res.json({ developers });
  } catch (error) {
    console.error("Get All Developers Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//view by vendor
exports.getByVendor = async (req, res) => {
  try {

    const vendorId = req.user._id;
    console.log('vendor', vendorId);

    const developers = await Developer.find({ 'addedByVendor.vendorId': vendorId });
    console.log("devloper-data", developers);
    res.json({ developers });
  } catch (error) {
    console.error('Get Developers by Vendor Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//update developer
exports.updateDeveloper = async (req, res) => {
  try {
    const developerId = req.params.id;
    const { name, experience, technology, resume, available, rate } = req.body;

    const updatedDeveloper = await Developer.findByIdAndUpdate(
      developerId,
      { name, experience, technology, resume, available, rate },
      { new: true }
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.json({ message: "Developer updated successfully", updatedDeveloper });
  } catch (error) {
    console.error("Update Developer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete dev
exports.deleteDeveloper = async (req, res) => {
  try {
    const developerId = req.params.id;
    const deletedDeveloper = await Developer.findByIdAndDelete(developerId);

    if (!deletedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.json({ message: "Developer deleted successfully", deletedDeveloper });
  } catch (error) {
    console.error("Delete Developer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




//count devloper with 
exports.countDeveloper = async (req, res) => {
  try {
    // Get the admin token from the request headers
    const adminToken = req.headers.authorization;

    // Check if the admin token is provided
    if (!adminToken) {
      console.error('Admin token not provided');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from "Bearer <token>"
    const token = adminToken.split(' ')[1];

    // Verify the admin token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET || 'admin-secret-key', (err, decoded) => {
        if (err) {
          console.error('Admin token verification failed:', err);
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    // Check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
      console.error('Admin token has expired');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Admin token is valid, proceed to count vendors
    const count = await Developer.countDocuments();
    res.send(count.toString());
  } catch (error) {
    console.error('Get Developer Count Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
