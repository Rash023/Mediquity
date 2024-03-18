const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/SignUp", Signup);
router.post("/Medication", createMedication);

module.exports = router;
