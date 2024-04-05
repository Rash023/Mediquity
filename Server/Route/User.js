const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
<<<<<<< Updated upstream
const { getSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getCurrentAppointments,
  getPastAppointments,
} = require("../Controller/Appointments");
=======
const { docSignup, docLogin } = require("../Controller/Doctor");
const { addSlots } = require("../Controller/Slots");
>>>>>>> Stashed changes

const express = require("express");
const router = express.Router();

<<<<<<< Updated upstream
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
=======
router.post("/login", login); //route for login page
router.post("/signup", Signup); //route for signup page
router.post("/medication", createMedication); // route to add medication for reminders
router.post("/createSlot", CreateSlots); //route to create slots for the doctor
router.post("/bookSlot", BookSlots); //route to book appointments of the doctor
router.post("/upload", fileuploader); //route to upload the file for the user
router.post("/search", SearchFile); //route to search from the uploaded files
router.get("/viewFiles", getFiles); //route to view all the files
router.post("/contactUs", contactUsController); //route for the contact us page
router.post("/doctorSignup", docSignup); //route for doctor signup
router.post("/doctorLogin", docLogin); //route to login for the doctor
router.post("/addSlots", addSlots);
>>>>>>> Stashed changes
module.exports = router;
