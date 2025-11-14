const { Server } = require("socket.io");

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

    socket.on("video_frame", (data) => {
      io.emit("video_frame_broadcast", data);
    });

    socket.on("new_alert", (data) => {
      console.log("🚨 NEW ALERT FROM PI:", data);
      io.emit("new_alert_broadcast", data);
    });

    socket.on("trigger_siren", (data) => {
      console.log("Trigger Siren received from dashboard:", data);
      io.emit("trigger_siren", data);
    });

    socket.on("disconnect", () => {
      console.log("Device Disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initSocket;
module.exports.io = () => io;
