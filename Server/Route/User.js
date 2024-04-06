const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
const { getSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getCurrentAppointments,
  getPastAppointments,
} = require("../Controller/Appointments");

const express = require("express");
const router = express.Router();

router.post("/login", login); 
router.post("/signup", Signup); 
router.post("/medication", createMedication); 
router.post("/upload", fileuploader); 
router.post("/search", SearchFile); 
router.get("/viewFiles", getFiles); 
router.post("/contactUs", contactUsController); 
router.post("/bookAppointment", createAppointment); 
router.get("/ViewAppointments", getCurrentAppointments); 
router.get("/AppointmentHistory", getPastAppointments); 
router.get("/getSlots", getSlots); 
module.exports = router;
