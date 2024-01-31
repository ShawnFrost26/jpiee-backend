// src/app.js
const express = require("express");
const formRoutes = require("./routes/formRoutes");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api", formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
