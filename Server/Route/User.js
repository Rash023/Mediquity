const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { CreateSlots, BookSlots } = require("../Controller/Slots");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/signup", Signup);
router.post("/medication", createMedication);
router.post("/createSlot", CreateSlots);
router.post("/bookSlot", BookSlots);
router.post("/upload", fileuploader);
router.post("/search", SearchFile);
router.get("/viewFiles", getFiles);
router.post("/contactUs", contactUsController);

module.exports = router;
