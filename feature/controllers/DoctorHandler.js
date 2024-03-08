const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//function to generate slots for the doctor

function generateSlots() {
  const slots = [];
  const startTime = new Date().setHours(8, 0, 0, 0);
  const endTime = new Date().setHours(11, 0, 0, 0);
  for (let time = startTime; time < endTime; time += 15 * 60 * 1000) {
    slots.push({
      startTime: new Date(time),
      endTime: new Date(time + 15 * 60 * 1000),
      isAvailable: true,
      bookedBy: [],
    });
  }
  return slots;
}

//signup route handler

exports.docSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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

    const slots = generateSlots();

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
