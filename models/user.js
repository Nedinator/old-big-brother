const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  userID: String,
  bans: {type: [{}], default: [{}]},
  kicks: {type: [{}], default: [{}]}
});

module.exports = mongoose.model("User", userSchema)
