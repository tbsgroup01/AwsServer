
require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  await sequelize.authenticate();
  console.log("RDS MySQL connection established successfully.");

  // Register models and synchronize tables
  require("../models/User");
  await sequelize.sync();
  console.log("Database models synchronized successfully.");
};

module.exports = { sequelize, connectDB };

// printing-db.cl8usum6kmlo.ap-southeast-2.rds.amazonaws.com

