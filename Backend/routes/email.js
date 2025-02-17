require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Email sending route
router.post("/send-email", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required!" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Hotel Booking Confirmation",
    text: `Hello ${name},\n\nThank you for booking with us! Your reservation has been confirmed.\n\nRegards,\nHotel Team`
    ,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
