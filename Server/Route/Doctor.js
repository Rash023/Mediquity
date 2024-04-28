const express = require("express");
const router = express.Router();
const { addSlots } = require("../Controller/Slots");
const { signup, login, getDoctorSlots } = require("../Controller/Doctor");
const { getDoctorBySpecialisation } = require("../Controller/Doctor");

router.post("/signup", signup);
router.post("/login", login);
router.post("/addSlots", addSlots);
router.get("/getDoctorBySpecialisation", getDoctorBySpecialisation);
router.get("/getDoctorSlots", getDoctorSlots);

module.exports = router;
