const express = require("express");
const router = express.Router();
const Room = require("../model/room");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Add a room (already implemented)
router.post("/addroom", upload.array("images", 3), async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    const newRoom = new Room({
      hotel_name: req.body.hotel_name,
      max_count: req.body.max_count,
      phone_number: req.body.phone_number,
      location: req.body.location,
      rent_per_day: req.body.rent_per_day,
      description: req.body.description,
      type: req.body.type,
      image_urls: imageUrls,
      owner: req.body.owner, 
    });

    await newRoom.save();
    res.status(201).json({ message: "Room added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding room" });
  }
});


router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rooms" });
  }
});


router.get("/getrooms/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const rooms = await Room.find({ owner: ownerId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
});


// Get a single room by ID
router.get("/getroom/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a room by ID
router.put("/updateroom/:id", upload.array("images", 5), async (req, res) => {
  try {
    let updatedData = req.body;

    if (req.files.length > 0) {
      updatedData.image_urls = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a room by ID
router.delete("/deleteroom/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
