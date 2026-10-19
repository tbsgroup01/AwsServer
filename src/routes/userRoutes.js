const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

// Endpoint to create a user: POST /api/users
router.post("/", createUser);

// Endpoint to get all users: GET /api/users
router.get("/", getUsers);

module.exports = router;
