const express = require("express");
const Slots = require("../Model/Slots");

exports.CreateSlots = async (req, res) => {
  try {
    const { name, specialization, slots } = req.body;

    if (!name || !specialization || !slots) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    const newSlot = new Slots({
      name,
      specialization,
      slots,
    });

    const savedSlot = await newSlot.save();

    return res.status(200).json({
      success: true,
      message: "Slots Created Succesffully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.BookSlots = async (req, res) => {
  try {
    const { doctorId, userId, slotIndex } = req.body;
    console.log(doctorId, userId, slotIndex);

    if (!doctorId || !userId) {
      return res.status(401).json({
        success: false,
        messsage: "Invalid Input",
      });
    }

    const doctor = await Slots.findById(doctorId);

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (slotIndex < 0 || slotIndex > doctor.slots.length) {
      return res.status(401).json({
        success: false,
        message: "Invalid Slot",
      });
    }

    if (doctor.slots[slotIndex].bookings.length >= 4) {
      return res.status(400).json({
        success: false,
        message: "All slots booked :(",
      });
    }

    doctor.slots[slotIndex].bookings.push(userId);

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Slot booked succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
};
