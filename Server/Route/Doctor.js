const express = require("express");
const { addSlots } = require("../Controller/Slots");
const { signup, login, getDoctorSlots } = require("../Controller/Doctor");
const { getDoctorBySpecialisation } = require("../Controller/Doctor");
const router = express.Router();

router.post("/signup", signup); //route for doctor signup
router.post("/login", login); //route for doctor login
router.post("/addSlots", addSlots); //route to add slots for the doctor
router.get("/getDoctorBySpecialisation", getDoctorBySpecialisation); //route to get the specialization of doctor
router.get("/getDoctorSlots", getDoctorSlots); //route to get all the slots for a doctor

module.exports = router;
