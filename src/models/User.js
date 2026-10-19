const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_user_email",
        msg: "Email address is already in use",
      },
      validate: {
        isEmail: { msg: "Please provide a valid email address" },
        notEmpty: { msg: "Email is required" },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
