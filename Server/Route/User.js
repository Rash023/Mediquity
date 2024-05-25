const express = require("express");
const router = express.Router();

const { Signup, login, userDetail } = require("../Controller/User");
const { fileuploader, SearchFile, getFiles } = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
const { getSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getAppointments,
  cancelAppointment,
} = require("../Controller/Appointments");

router.get("/", userDetail);
router.post("/login", login);
router.post("/signup", Signup);
router.post("/upload", fileuploader);
router.post("/search", SearchFile);
router.get("/viewFiles", getFiles);
router.post("/contactUs", contactUsController);
router.post("/bookAppointment", createAppointment);
router.get("/getAppointments", getAppointments);
router.delete("/cancelAppointment", cancelAppointment);
router.get("/getSlots", getSlots);

module.exports = router;
