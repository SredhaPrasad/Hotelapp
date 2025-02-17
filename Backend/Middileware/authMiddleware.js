const jwt = require("jsonwebtoken");
// const Hotel = require("../model/");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

const verifyHotelOwner = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel || hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access Forbidden" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { verifyToken, verifyHotelOwner };
