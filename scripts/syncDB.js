// scripts/syncDB.js
const sequelize = require("../src/config/sequelize");
const ApplicationForm = require("../src/models/applicationFormModel");

async function syncDB() {
  try {
    await sequelize.sync({ force: true }); // Set force to true only during initial development
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  } finally {
    await sequelize.close();
  }
}

syncDB();
