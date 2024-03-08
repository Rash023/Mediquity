const { docSignup } = require("../controllers/DoctorHandler");
const { Signup } = require("../controllers/UserHandler");

const { SlotHandler } = require("../controllers/slotHandler");
const express = require("express");
const router = express.Router();

router.post("/bookSlot", SlotHandler);
router.post("/docSignUp", docSignup);
router.post("/SignUp", Signup);
module.exports = router;
