const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "hotel", "user"], default: "user" } ,// Added role field
  isApproved: { type: Boolean, default: false },
  
});

const userData = mongoose.model("userdata", UserSchema);
module.exports = userData;
