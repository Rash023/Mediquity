const express = require("express");
const Slots = require("../Model/Slots");
const Doctor = require("../Model/Doctor");
const jwt = require("jsonwebtoken");

exports.addSlots = async (req, res) => {
  try {
    const { days, time } = req.body;
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const doctor = await Doctor.findById(id);

    // Find all existing slots for the doctor
    const existingSlots = await Slots.find({ doctorId: doctor._id });

    // Filter out the slots whose day and time match with the entries already present
    const newSlots = days
      .map((day) => ({
        doctorId: doctor._id,
        day,
        time,
      }))
      .filter((newSlot) => {
        return !existingSlots.some(
          (existingSlot) =>
            existingSlot.day === newSlot.day &&
            existingSlot.time === newSlot.time
        );
      });

    const createdSlots = await Slots.insertMany(newSlots);

    const newSlotIds = createdSlots.map((slot) => slot._id);

    doctor.slots.push(...newSlotIds);
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "New Slots added Successfully",
      newSlotIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
