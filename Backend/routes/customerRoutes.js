const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserData = require("../model/customer");
require("dotenv").config();
const stripe = require("stripe")(process.env.stripe_private_key);
const router = express.Router();


const verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ message: "Access Denied. No Token Provided" });
    }
    try {
      const decoded = jwt.verify(token, "HotelApp");
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access Denied. Insufficient Permissions" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, confirmpassword, role } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserData({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    
     
    
    });

    await newUser.save();
    res.status(201).json({ message: " registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await UserData.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const payload = {name:user.name, email: user.email, role: user.role,  userId: user.id, isApproved: user.isApproved };
    const token = jwt.sign(payload, "HotelApp", { expiresIn: "1h" });

    res.status(200).send({ message: "Login Successful", token: token, role: user.role, userId: user.id, isApproved: user.isApproved});
  } 
  catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

router.post("/payment", async (req, res) => {
  const { totalAmount } = req.body;

  try {
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
              {
                  price_data: {
                      currency: "inr",
                      product_data: {
                          name: "Hotel Booking",
                      },
                      unit_amount: totalAmount * 100, // Stripe requires amount in paise
                  },
                  quantity: 1,
              },
          ],
          success_url: "http://localhost:5173/home",
          cancel_url: "http://localhost:5173/home",
      });

      res.json({ id: session.id });
  } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: "Payment failed!" });
  }
})



module.exports = { router, verifyRole };
