const bcrypt = require("bcrypt");
const Doctor = require("../Model/Doctor");
const Appointment = require("../Model/Appointments");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const Slot = require("../Model/Slots");

/* HELPER FUNCTION TO UPLOAD FILE TO CLOUDINARY */
async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

/* HELPER FUNCTION TO GET HOUR DIFFERENCE BETWEEN TWO TIMES */
function getHoursBetween(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const endTotalMinutes = endHour * 60 + endMinute;
  const hourDifference = Math.abs((endTotalMinutes - startTotalMinutes) / 60);
  return hourDifference;
}

/* DOCTOR SIGN UP */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    const image = req.files.file;
    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    let hashPassword = null;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const uploadDetails = await uploadFiletoCloudinary(image, "uploads");
    const imageUrl = uploadDetails.secure_url;
    await Doctor.create({
      name,
      email,
      password: hashPassword,
      specialization,
      image: imageUrl,
    });
    return res.status(200).json({
      success: true,
      message: "Doctor created Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Doctor cannot be registered please try again later",
    });
  }
};

/* DOCTOR LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the details carefully",
      });
    }
    let user = await Doctor.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const payload = {
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      user.email = undefined;
      const options = {
        expires: new Date(Date.now() + 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Doctor logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

/* GET DOCTOR BY SPECIALISATION */
exports.getDoctorBySpecialisation = async (req, res) => {
  try {
    const { specialization } = req.query;

    /* TODO: */
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const userId = decodedToken.id;

    const doctors = await Doctor.find({
      specialization: specialization,
      _id: { $ne: userId },
    });

    return res.status(200).json({
      success: true,
      doctors: doctors,
      message: "Successfully fetched Doctor By Specialization",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      successs: false,
      message: "Error Getting Doctor By Specialization",
    });
  }
};

/* GET DOCTOR SLOTS */
exports.getDoctorSlots = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Slot.find({ doctorId: id })
      .populate({ path: "doctorId", select: "name specialization" })
      .exec();
    const responseFilter = response.map((slot) => {
      const newSlotTime = slot.time.slice(0, -3);
      const [startTime, endTime] = newSlotTime.split("-");
      const hourDiff = getHoursBetween(startTime, endTime);
      const slotSize = hourDiff / 0.5;
      const isFull = slot.appointments.length >= slotSize;
      return {
        ...slot.toObject(),
        isFull: isFull,
      };
    });
    return res.status(200).json({
      success: true,
      data: responseFilter,
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

/* CANCEL APPOINTMENT */
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Please provide Appointment ID",
      });
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const doctorId = decodedToken.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const appointment = await Appointment.findById(appointmentId).populate({
      path: "slotId",
      select: "day time",
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid Appointment ID",
      });
    }

    if (!appointment.doctorId.equals(doctor._id)) {
      return res.status(401).json({
        success: false,
        message: "Doctor is unauthorized",
      });
    }

    const currentDate = new Date();
    const day = appointment.slotId.day;
    const time = appointment.slotId.time;
    const dayParts = day.split(".");
    const parsedDay = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);
    const timeParts = time.split("-");

    const endTimeParts = timeParts[0].split(":");
    const parsedEndtime = new Date(parsedDay);
    parsedEndtime.setHours(parseInt(endTimeParts[0], 10));
    parsedEndtime.setMinutes(parseInt(endTimeParts[1], 10));
    parsedEndtime.setSeconds(0);

    if (parsedEndtime < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Unable to cancel Appointment now",
      });
    }

    await Slot.findByIdAndUpdate(
      { _id: appointment.slotId._id },
      { $pull: { appointments: appointment._id } }
    );

    await User.findByIdAndUpdate(
      { _id: appointment.patientId },
      { $pull: { appointments: appointment._id } }
    );

    await Appointment.findByIdAndDelete(appointmentId);

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
