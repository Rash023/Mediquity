const User = require("../Models/User");

const Doctor = require("../Models/Doctor");

exports.SlotHandler = async (req, res) => {
  try {
    const { userId, doctorId, slotIndex } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Check if the slot index is valid
    if (slotIndex < 0 || slotIndex >= doctor.slots.length) {
      return res.status(400).send("Invalid slot index");
    }

    // Check if the slot is available
    if (
      !doctor.slots[slotIndex].isAvailable ||
      doctor.slots[slotIndex].createdAt == Date.now()
    ) {
      return res.status(400).send("Slot is already booked");
    }

    // Book the slot for the user
    doctor.slots[slotIndex].isAvailable = false;
    doctor.slots[slotIndex].bookedBy.push(userId);
    doctor.slots[slotIndex].createdAt = Date.now();
    await doctor.save();

    res.status(200).send("Slot booked successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
