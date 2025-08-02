const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

