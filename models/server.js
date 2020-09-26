const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
  serverName: String,
  serverID: String,
  adminChannel: String,
  notifChannel: String,
  alerts: {type: Boolean, default: false}
});

module.exports = mongoose.model("Server", serverSchema)