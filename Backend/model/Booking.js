
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  hotel: { type: String, required: true },
  room: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  messageSent: { type: Boolean, default: false }, // Track message status
});

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
