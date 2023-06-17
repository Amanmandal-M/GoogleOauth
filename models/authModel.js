const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  GoogleId: String,
  Name: String,
  Email: String,
  ProfileUrl: String,
  isVerifiedEmail: Boolean,
});

const userModel = mongoose.model("userCredentials", userSchema);

module.exports = { userModel };
