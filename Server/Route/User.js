const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { CreateSlots, BookSlots } = require("../Controller/Slots");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");

const express = require("express");
const router = express.Router();

router.post("/login", login); //route for login page
router.post("/signup", Signup); //route for signup page
router.post("/medication", createMedication); // route to add medication for reminders
router.post("/createSlot", CreateSlots); //route to create slots for the doctor
router.post("/bookSlot", BookSlots); //route to book appointments of the doctor
router.post("/upload", fileuploader); //route to upload the file for the user
router.post("/search", SearchFile); //route to search from the uploaded files
router.get("/viewFiles", getFiles); //route to view all the files
router.post("/contactUs", contactUsController); //route for the contact us page

module.exports = router;
