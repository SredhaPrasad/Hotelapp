const express = require("express");
const bcrypt = require("bcryptjs");
const UserData = require("../model/customer"); // No .js needed
const userData = require("../model/customer");
const jwt = require("jsonwebtoken");


const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    console.log("Received Registration Data:", req.body);
    const { name, email, phone,address, password, confirmpassword } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserData({
      name,
      email,
      phone,
      address,
      password,
    });

    // Save user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// // Login User
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await UserData.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({ message: "Login successful", user });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get all users (Optional)
// router.get("/users", async (req, res) => {
//   try {
//     const users = await UserData.find().select("-password"); // Excluding password
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


//login
router.post("/login", async (req, res) => {
  
  const user = await userData.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  try {
    if (user.password == req.body.password) {
      const payload = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      const token = jwt.sign(payload, "HotelApp"); 
     
      res.status(200).send({ message: "Login Successful", token: token });
    } else {
      res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
