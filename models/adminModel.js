// models/adminModel.js

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String } // Add a token field
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
