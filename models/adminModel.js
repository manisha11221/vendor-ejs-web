const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }, // Add a token field
  role: { type: String, required: true, enum: ['admin', 'vendor'] },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
