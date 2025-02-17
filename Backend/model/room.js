const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
   
    hotel_name: { type: String, required: true },
    max_count: { type: Number, required: true },
    phone_number: { type: Number, required: true },
    location: { type: String, required: true },
    rent_per_day: { type: Number, required: true },
    image_urls: { type: [String]}, // Ensure it's an array
    description: { type: String, required: true },
    type: { type: String, required: true },
    approved: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "userdata", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);



