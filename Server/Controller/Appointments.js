const Model = require("../Model/Appointments");
const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");
const User = require("../Model/User");
const Appointment = require("../Model/Appointments");

require("dotenv").config();

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
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decodedToken.id;

    const { doctorId, slotId } = req.body;
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
    const day = slot.day;
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

exports.getAppointments = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const appointments = await Appointment.find({ patientId: id }).populate({
      path: "doctorId",
      select: "name email",
    });
    return res.status(200).json({
      success: true,
      appointments: appointments,
      message: "Appointments found successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
