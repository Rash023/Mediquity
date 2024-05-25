const express = require("express");
const {
  createMedication,
  deleteMedication,
  getMedications,
  updateMedicationStatus,
} = require("../Controller/Medication");
const router = express.Router();

router.post("/addMedication", createMedication);
router.delete("/deleteMedication", deleteMedication);
router.get("/getMedication", getMedications);
router.put("/updateStatus", updateMedicationStatus);

module.exports = router;
