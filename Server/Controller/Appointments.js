const Model = require("../Model/Appointments");
const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");

require("dotenv").config();

exports.createAppointment = async (req, res) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decodedToken.id;

    const { doctorId, day, time, link } = req.body;

    if (!link) {
      return res.status(401).json({
        success: false,
        message: "Invalid Link",
      });
    }

    const slot = await Slot.findOne({
      doctorId: doctorId,
      day: day,
      time: time,
    });
    if (!slot) {
      return res.status(401).json({
        success: false,
        message: "Invalid Slot",
      });
    }

    const newAppointment = new Model({
      doctorId,
      patientId,
      day,
      time,
      link,
    });

    await newAppointment.save();
    console.log("here");
    const appointment = await Model.findOne({
      doctorId,
      patientId,
      day,
      time,
      link,
    });

    const slotdata = await Slot.findOne({ doctorId, day, time });

    slotdata.appointments.push(appointment._id);
    await slotdata.save();

    return res.status(200).json({
      success: true,
      message: "Appointment Added Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
