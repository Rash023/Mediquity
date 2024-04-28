const { Signup, login, userDetail } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
const { getSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getAppointments,
  // cancelAppointment,
} = require("../Controller/Appointments");

const express = require("express");
const router = express.Router();

// Route to get user details
router.get("/", userDetail);

// Route to handle user login
router.post("/login", login);

// Route to handle user signup
router.post("/signup", Signup);

// Route to handle medication creation
router.post("/medication", createMedication);

// Route to handle file uploading
router.post("/upload", fileuploader);

// Route to handle file searching
router.post("/search", SearchFile);

// Route to get files
router.get("/viewFiles", getFiles);

// Route to handle contact form submission
router.post("/contactUs", contactUsController);

// Route to book an appointment
router.post("/bookAppointment", createAppointment);

// Route to get appointments
router.get("/getAppointments", getAppointments);

// Route to cancel an appointment
// router.get("/cancelAppointment", cancelAppointment);

// Route to get available slots
router.get("/getSlots", getSlots);

module.exports = router;
