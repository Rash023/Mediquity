const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");
const User = require("../Model/User");
const Appointment = require("../Model/Appointments");
const Slots = require("../Model/Slots");

/* HELPER FUNCTION TO GENERATE VIDEO CALL CODE */
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
    const link = `http://mediquity.vercel.app/video-call?roomID=${code}`;
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
    const day = slot.day;
    const time = slot.time;
    const newAppointment = new Appointment({
      doctorId,
      slotId,
      patientId,
      day,
      time,
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
      const day = appointmentObject.day;
      const time = appointmentObject.time;
      const dayParts = day.split(".");
      const parsedDay = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);
      const timeParts = time.split("-");
      /* CAN CANCEL IF CURRENT DATE IS LESS THAN STARTING TIME OF APPOINTMENT */
      const endTimeParts = timeParts[0].split(":");
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

/* CANCEL APPOINTMENT */
exports.cancelAppointment = async (req, res) => {
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
    /* LOGIN USER ID */
    const id = decodedToken.id;
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(500).json({
        success: false,
        message: "Please provide an Appointment ID",
      });
    }
    /* APPOINTMENT TO CANCEL */
    const appointment = await Appointment.findById({ _id: appointmentId })
      .populate({
        path: "doctorId",
        select: "name email",
      })
      .populate({
        path: "slotId",
        select: "day time",
      });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid Appointment ID",
      });
    }
    if (appointment.patientId.toString() !== id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
    const currentDate = new Date();
    const day = appointment.day;
    const time = appointment.time;
    const dayParts = day.split(".");
    const parsedDay = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);
    const timeParts = time.split("-");
    /* CAN CANCEL IF CURRENT DATE IS LESS THAN STARTING TIME OF APPOINTMENT */
    const endTimeParts = timeParts[0].split(":");
    const parsedEndtime = new Date(parsedDay);
    parsedEndtime.setHours(parseInt(endTimeParts[0], 10));
    parsedEndtime.setMinutes(parseInt(endTimeParts[1], 10));
    parsedEndtime.setSeconds(0);
    if (parsedEndtime < currentDate) {
      return res.status(500).json({
        success: false,
        message: "Unable to cancel Appointment now",
      });
    }
    /* PULL FROM SLOT */
    await Slots.findByIdAndUpdate(
      { _id: appointment.slotId._id },
      {
        $pull: {
          appointments: appointment._id,
        },
      }
    );
    /* PULL FROM USER */
    await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          appointments: appointment._id,
        },
      }
    );
    /* REMOVE FROM APPOINTMENT */
    await Appointment.findByIdAndDelete({ _id: appointment._id });
    return res.status(200).json({
      success: true,
      message: "Successfully cancelled Appointment",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
