const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);

module.exports = app;
