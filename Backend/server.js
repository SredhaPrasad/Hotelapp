const express = require("express");
const cors = require("cors"); // Add CORS middleware
require('dotenv').config();
const app = express();
require('./db/connection')

app.use(cors());
app.use(express.json()); // Important: Enables JSON parsing
const userRoutes = require("./routes/customerRoutes");

app.use("/users", userRoutes);



const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));