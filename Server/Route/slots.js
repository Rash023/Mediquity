const { Signup, login } = require("../controllers/UserHandler");
const { createMedication } = require("../controllers/medicationHandler");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/SignUp", Signup);
router.post("/Medication", createMedication);

module.exports = router;
