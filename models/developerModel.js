const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  technology: [
    {
      type: String,
      required: true,
    },
  ],
  resume: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  //rate of the developer
  rate: {
    type: Number,
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
