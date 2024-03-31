const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
const { docSignup, docLogin } = require("../Controller/Doctor");
const { addSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getCurrentAppointments,
  getPastAppointments,
} = require("../Controller/Appointments");

const express = require("express");
const router = express.Router();

router.post("/login", login); //route for login page
router.post("/signup", Signup); //route for signup page
router.post("/medication", createMedication); // route to add medication for reminders
router.post("/upload", fileuploader); //route to upload the file for the user
router.post("/search", SearchFile); //route to search from the uploaded files
router.get("/viewFiles", getFiles); //route to view all the files
router.post("/contactUs", contactUsController); //route for the contact us page
router.post("/doctorSignup", docSignup); //route for doctor signup
router.post("/doctorLogin", docLogin); //route to login for the doctor
router.post("/addSlots", addSlots); //route to add slots for the doctor
router.post("/bookAppointment", createAppointment); //route to book appointments for the user
router.get("/ViewAppointments", getCurrentAppointments); //route to view all the appointments of the user
router.get("/AppointmentHistory", getPastAppointments);
module.exports = router;
