const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//function to generate slots for the doctor

function generateSlots(includeSecondSlot) {
  const slots = [];
  const startTime1 = new Date().setHours(8, 0, 0, 0);
  const endTime1 = new Date().setHours(11, 0, 0, 0);

  for (let time = startTime1; time < endTime1; time += 15 * 60 * 1000) {
    const startTimeString = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTimeString = new Date(time + 15 * 60 * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    slots.push({
      startTime: startTimeString,
      endTime: endTimeString,
      isAvailable: true,
      bookedBy: [],
    });
  }

  if (includeSecondSlot) {
    const startTime2 = new Date().setHours(16, 0, 0, 0);
    const endTime2 = new Date().setHours(19, 0, 0, 0);

    for (let time = startTime2; time < endTime2; time += 15 * 60 * 1000) {
      const startTimeString = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const endTimeString = new Date(time + 15 * 60 * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      );
      slots.push({
        startTime: startTimeString,
        endTime: endTimeString,
        isAvailable: true,
        bookedBy: [],
      });
    }
  }

  return slots;
}
//signup route handler

exports.docSignup = async (req, res) => {
  try {
    const { name, email, password, Timings } = req.body;
    //check if user already exists
    const existingUser = await Doctor.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //securing password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    const slots = generateSlots(Timings);

    //create entry for user
    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashPassword,
      slots,
    });

    return res.status(200).json({
      success: true,
      message: "user created succesdfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered please try again later",
    });
  }
};

//login

exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details carefully",
      });
    }

    let user = await User.findOne({ email });
    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      //password matched
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
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
        message: "User logged in succesfully",
      });
    } else {
      //password do not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
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
