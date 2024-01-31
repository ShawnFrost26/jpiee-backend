// src/controllers/formController.js
const ApplicationForm = require("../models/applicationFormModel");
const nodemailer = require("nodemailer");

async function submitForm(req, res) {
  try {
    const { fullName, email, mobileNumber, selectedCourse, freeTextBox } =
      req.body;
    // Log the received data for debugging
    console.log("Received form data:", req.body);
    // Validate form data
    if (!fullName || !email || !mobileNumber) {
      return res.status(400).json({
        error: "Full name, email, and mobile number are required fields.",
      });
    }

    const formSubmission = await ApplicationForm.create({
      fullName,
      email,
      mobileNumber,
      selectedCourse,
      freeTextBox,
    });

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: "Form Submission Confirmation - " + fullName,
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Mobile Number: ${mobileNumber}
        Selected Course: ${selectedCourse || "Empty"}
        Free Text Box: ${freeTextBox || "Empty"}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Form submitted successfully", data: formSubmission });
  } catch (error) {
    console.error("Error submitting form:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function getForms(req, res) {
  try {
    const forms = await ApplicationForm.findAll();
    res.status(200).json({ data: forms });
  } catch (error) {
    console.error("Error retrieving forms:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  submitForm,
  getForms,
};
