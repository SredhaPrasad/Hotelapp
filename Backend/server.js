const express = require("express");
const UserData = require("./model/customer");  

const cors = require("cors");
require('dotenv').config();
const app = express();
require('./db/connection');
const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/customerRoutes").router; 
 const bookingRoutes=require("./routes/bookingRoutes");
const verifyRole = require("./routes/customerRoutes").verifyRole; 

const mongoose = require("mongoose");
const router = express.Router();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/api/rooms", roomRoutes);
 app.use("/booking",bookingRoutes) ;

 
 app.use("/api", require("./routes/email"));

app.get("/admin/dashboard", verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

app.get("/hotel/dashboard", verifyRole(["hotel"]), (req, res) => {
  res.json({ message: "Welcome to Hotel Dashboard" });
});

app.get("/user/dashboard", verifyRole(["user"]), (req, res) => {
  res.json({ message: "Welcome to User Dashboard" });
});



router.get("/admin/hotels", async (req, res) => {
  try {
    const hotels = await UserData.find({ role: "hotel" });

    if (!hotels) {
      return res.status(404).json({ message: "No hotels found" });
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);  
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
});

router.put("/admin/approve/:id", async (req, res) => {
  try {
    const updatedHotel = await UserData.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!updatedHotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ message: "Hotel approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error: error.message });
  }
});
app.use(router); 

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

