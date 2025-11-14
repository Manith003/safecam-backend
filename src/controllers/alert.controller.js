const Alert = require("../models/alert.model");
const { io } = require("../socket/socket");

// Pi sends a new alert
exports.newAlert = async (req, res) => {
  const alert = await Alert.create(req.body);
  console.log("alert from controller:", alert);
  io().emit("alert_received", alert);

  res.status(201).json(alert);
};

// Dashboard confirmed
exports.confirmAlert = async (req, res) => {
  const alert = await Alert.findOneAndUpdate(
    { id: req.body.id },
    { status: "CONFIRMED" },
    { new: true }
  );

  io().to(alert.deviceId).emit("trigger_siren");

  res.json(alert);
};

// Dashboard dismissed
exports.dismissAlert = async (req, res) => {
  const alert = await Alert.findOneAndUpdate(
    { id: req.body.id },
    { status: "DISMISSED" },
    { new: true }
  );

  res.json(alert);
};

// Dashboard fetches all alerts
exports.getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 });
  res.json(alerts);
};
