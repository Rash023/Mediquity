const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");
const User = require("../Model/User");
const Appointment = require("../Model/Appointments");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

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

/* CREATE APPOINTMENT */
exports.createAppointment = async (req, res) => {
  try {
    const token =
      req.body.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decodedToken.id;

    const { doctorId, slotId } = req.body;
    const code = generateRandomString(5);
    const link = `http://localhost:3000/video-call?roomID=${code}`;
    const slot = await Slot.findById(slotId);
    if (slot.doctorId.toString() !== doctorId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid slot for the doctor.",
      });
    }
    const user = await User.findById(patientId);
    if (!slot) {
      return res.status(401).json({
        success: false,
        message: "Invalid Slot",
      });
    }
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      slotId,
      link,
    });

    const savedAppointment = await newAppointment.save();

    user.appointments.push(savedAppointment._id);

    slot.appointments.push(savedAppointment._id);

    await slot.save();
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

/* GET ALL APPOINTMENTS */
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
    const appointments = await Appointment.find({ patientId: id })
      .populate({
        path: "doctorId",
        select: "name email",
      })
      .populate({
        path: "slotId",
        select: "day time",
      });

    const currentDate = new Date();
    const appointmentsWithCancel = appointments.map((appointment) => {
      const appointmentObject = appointment.toObject();
      const day = appointmentObject.slotId.day;
      const time = appointmentObject.slotId.time;
      const dayParts = day.split(".");
      const parsedDay = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);
      const timeParts = time.split("-");
      const endTimeParts = timeParts[1].split(":");
      const parsedEndtime = new Date(parsedDay);
      parsedEndtime.setHours(parseInt(endTimeParts[0], 10));
      parsedEndtime.setMinutes(parseInt(endTimeParts[1], 10));
      parsedEndtime.setSeconds(0);
      appointmentObject.canCancel = parsedEndtime > currentDate;
      return appointmentObject;
    });

    return res.status(200).json({
      success: true,
      appointments: appointmentsWithCancel,
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

// exports.cancelAppointment = async (req, res) => {
//   try {
//     //appointment id
//     const { id } = req.body.token;

//     if (!id) {
//       return res.status(401).json({
//         success: false,
//         message: "Enter appointment",
//       });
//     }

//     const data = Appointment.findById(id);

//     const userId = data.userId;
//     const slotId = data.slotId;

//     const slot = Slot.findById(slotId);
//     let currentDate = new Date();
//     const day = slot.day;
//     const startTime = slot.time.substring(2);
//     const endTime = slot.time.substring(4, 6);
//     console.log(startTime, endTime);

//     const currDay = new Date.getDay();
//     let hours = currentDate.getHours();
//     let minutes = currentDate.getMinutes();

//     // Add leading zeros if necessary
//     hours = hours < 10 ? "0" + hours : hours;
//     minutes = minutes < 10 ? "0" + minutes : minutes;

//     // Format the time as HH:MM
//     const currentTime = `${hours}:${minutes}`;

//     return res.status(200).json({
//       success: true,
//       message: "Appointment Removed Succesfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
