const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Both name and email are required fields",
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating user",
      error: error.message,
    });
  }
};

// Get all users (helper for checking entries in DB)
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching users",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
};
