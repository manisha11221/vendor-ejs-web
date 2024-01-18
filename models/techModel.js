// models/technology.js
const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false}
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
