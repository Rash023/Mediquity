const Model = require("../Model/Appointments");
const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");
const User = require("../Model/User");

require("dotenv").config();

//handler to create appointments
function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const randomString = generateRandomString(4);
console.log(randomString);

exports.createAppointment = async (req, res) => {
  try {
    const token =
      req.body.token || req.header("Authorization").replace("Bearer", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decodedToken.id;

    const { doctorId, day, slotId } = req.body;
    const str = generateRandomString(5);
    const link = `http://localhost:3000/video-call?roomID=${str}`;
    if (!link) {
      return res.status(401).json({
        success: false,
        message: "Invalid Link",
      });
    }

    const slot = await Slot.findById(slotId);
    const time = slot.time;

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

    const appointment = await Model.findOne({
      doctorId,
      patientId,
      day,
      time,
      link,
    });

    const slotdata = await Slot.findById(slotId);
    const user = await User.findById(patientId);

    user.appointments.push(appointment._id);

    slotdata.appointments.push(appointment._id);

    await slotdata.save();
    await user.save();

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

//handler to get all the appointments of the user

exports.getCurrentAppointments = async (req, res) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const data = await Model.find({ patientId: id });

    // Filter out appointments that have passed in the current week
    const filteredData = data.filter((appointment) => {
      const appointmentDay = days.indexOf(appointment.day);
      return appointmentDay >= currentDay;
    });

    console.log(filteredData);
    return res.status(200).json({
      success: true,
      data: filteredData,
      message: "Data found successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//handler to get all the past appointments of the user

exports.getPastAppointments = async (req, res) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const data = await Model.find({ patientId: id });

    // Filter out appointments that have passed in the current week
    const filteredData = data.filter((appointment) => {
      const appointmentDay = days.indexOf(appointment.day);
      return appointmentDay < currentDay;
    });

    console.log(filteredData);
    return res.status(200).json({
      success: true,
      data: filteredData,
      message: "Data found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
