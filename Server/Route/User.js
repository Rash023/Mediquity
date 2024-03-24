const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { CreateSlots, BookSlots } = require("../Controller/Slots");
const { fileuploader, SearchFile } = require("../Controller/Files");
const { contactUsController }=require("../Controller/ContactUs");

const express = require("express");
const router = express.Router();

router.post("/Login", login);
router.post("/Signup", Signup);
router.post("/Medication", createMedication);
router.post("/Createslot", CreateSlots);
router.post("/Bookslot", BookSlots);
router.post("/upload", fileuploader);
router.post("/Search", SearchFile);
router.post("/contactUs",contactUsController);
module.exports = router;
