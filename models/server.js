const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
  serverName: String,
  serverID: String,
  adminChannel: String,
  notifChannel: String
});

module.exports = mongoose.model("Server", serverSchema)