const { Signup, login } = require("../Controller/User");
const { createMedication } = require("../Controller/Medication");
const { CreateSlots, BookSlots } = require("../Controller/Slots");

const express = require("express");
const router = express.Router();

router.post("/Login", login);
router.post("/Signup", Signup);
router.post("/Medication", createMedication);
router.post("/Createslot", CreateSlots);
router.post("/Bookslot", BookSlots);

module.exports = router;
