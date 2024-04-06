const bcrypt = require("bcrypt");
const Doctor = require("../Model/Doctor");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Slot = require("../Model/Slots");

//function to upload files to cloudinary
async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//controller for doctor Signup
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

    let hashPassword;
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

//login for doctor

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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

//handler to fetch all doctors with specialization

exports.getDoctorBySpecialisation = async (req, res) => {
  try {
    const { specialization } = req.query;
    console.log(specialization);
    const doctors = await Doctor.find({ specialization: specialization });
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

//handler to get the booking slots the doctor
exports.getDoctorSlots = async (req, res) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const response = await Slot.find({ doctorId: id });

    const responseFilter = response.map((slot) => {
      const [startTime, endTime] = slot.time
        .split("-")
        .map((time) => new Date(`01/01/2000 ${time}`).getTime()); // Convert slot time to milliseconds
      const hourDiff = (endTime - startTime) / (1000 * 60 * 60); // Calculate hour difference
      const slotSize = hourDiff / 0.5; // Divide by 0.5
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
