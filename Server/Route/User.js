const express = require("express");
const router = express.Router();

const { signup, login, userDetail } = require("../Controller/User");
const {
  fileuploader,
  SearchFile,
  getFiles,
  deleteFile,
} = require("../Controller/Files");
const { contactUsController } = require("../Controller/ContactUs");
const { getSlots } = require("../Controller/Slots");
const {
  createAppointment,
  getAppointments,
  cancelAppointment,
} = require("../Controller/Appointments");

router.get("/", userDetail);
router.post("/login", login);
router.post("/signup", signup);
router.post("/upload", fileuploader);
router.delete("/deleteFile/:fileId", deleteFile);
router.post("/search", SearchFile);
router.get("/viewFiles", getFiles);
router.post("/contactUs", contactUsController);
router.post("/bookAppointment", createAppointment);
router.get("/getAppointments", getAppointments);
router.delete("/cancelAppointment", cancelAppointment);
router.get("/getSlots", getSlots);

module.exports = router;
