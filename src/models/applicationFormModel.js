// src/models/applicationFormModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ApplicationForm = sequelize.define("ApplicationForm", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
  selectedCourse: {
    type: DataTypes.STRING,
  },
  freeTextBox: {
    type: DataTypes.TEXT,
  },
});

module.exports = ApplicationForm;
