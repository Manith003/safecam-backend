const { Server } = require("socket.io");
const { sendSMS } = require("../services/smsService");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Device Connected:", socket.id);

    socket.on("register_device", (data) => {
      console.log("Pi Registered:", data.deviceId);
      socket.join(data.deviceId);
    });

    socket.on("dashboard_ready", (data) => {
      console.log("📺 Dashboard ready:", data.deviceId);
      io.to(data.deviceId).emit("start_webrtc");
    });

    socket.on("new_alert", (data) => {
      console.log("🚨 NEW ALERT FROM PI:", data);
      io.emit("new_alert_broadcast", data);
    });

    // socket.on("trigger_siren", (data) => {
    //   console.log("Trigger Siren received from dashboard:", data);
    //   io.emit("trigger_siren", data);
    // });

    socket.on("trigger_siren", async (data) => {
      console.log("🚨 Confirmed Alert:", data);

      // 1️⃣ Trigger siren on Pi
      io.to(data.deviceId).emit("trigger_siren", data);

      // 2️⃣ Send SMS
      const mapsLink = `https://maps.google.com/?q=${data.latitude},${data.longitude}`;

      const message = `
🚨 ALERT CONFIRMED!

Device: ${data.deviceId}

Location:
${mapsLink}

Immediate attention required.
`;

      await sendSMS(message);
    });

    socket.on("webrtc_offer", (data) => {
      console.log("📡 webrtc_offer from", data.deviceId);
      io.emit("webrtc_offer", data);
    });

    socket.on("webrtc_answer", (data) => {
      console.log("📡 webrtc_answer for", data.deviceId);
      io.to(data.deviceId).emit("webrtc_answer", data);
    });

    socket.on("webrtc_ice_candidate", (data) => {
      io.emit("webrtc_ice_candidate", data);
    });

    socket.on("disconnect", () => {
      console.log("Device Disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initSocket;
module.exports.io = () => io;
