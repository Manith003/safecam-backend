const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  id: String,
  deviceId: String,
  location: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "DISMISSED"], default: "PENDING" },
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model("Alert", alertSchema);
