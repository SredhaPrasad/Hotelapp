


const express = require("express");
const router = express.Router();
router.use(express.json());
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Booking = require("../model/Booking");
const { verifyToken, verifyHotelOwner } = require("../Middileware/authMiddleware");
const userData = require("../model/customer");

// ➤ Add a new booking
router.post("/add", async (req, res) => {
  const { user, hotel, room, checkInDate, checkOutDate, totalPrice } = req.body;

  if (!user || !hotel || !room || !checkInDate || !checkOutDate || !totalPrice) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBooking = new Booking({
      user,
      hotel,
      room,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ➤ Get all bookings for a specific hotel
router.get("/hotel/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    const bookings = await Booking.find({ hotel: hotelId });

    const bookingsWithUserDetails = await Promise.all(
      bookings.map(async (booking) => {
        const user = await userData.findById(booking.user);
        return {
          ...booking.toObject(),
          user,
        };
      })
    );

    res.send(bookingsWithUserDetails);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Something went wrong while fetching bookings" });
  }
});

// ➤ Send email and update messageSent status
router.post("/send-email", async (req, res) => {
  const { email, name, bookingId } = req.body;

  if (!email || !name || !bookingId) {
    return res.status(400).json({ error: "Missing email, name, or booking ID" });
  }

  try {
    console.log(`Sending email to ${name} at ${email}`);

    // Update messageSent status after successful email
    await Booking.findByIdAndUpdate(bookingId, { messageSent: true });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
