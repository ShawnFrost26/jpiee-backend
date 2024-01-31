// src/routes/formRoutes.js
const express = require("express");
const bodyParser = require("body-parser");
const formController = require("../controllers/formController");

const router = express.Router();
router.use(bodyParser.json());

router.post("/submit-form", formController.submitForm);
router.get("/get-forms", formController.getForms);

module.exports = router;
