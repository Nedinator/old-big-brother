const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  userID: String,
  bans: {type: [{}], default: [{}]},
  unbans: {type: [{}], default: [{}]}
});

module.exports = mongoose.model("User", userSchema)
