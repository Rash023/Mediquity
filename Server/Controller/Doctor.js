const bcrypt = require("bcrypt");
const Doctor = require("../Model/Doctor");
const jwt = require("jsonwebtoken");

//controller for doctor Signup

exports.signup = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

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

    await Doctor.create({
      name,
      email,
      password: hashPassword,
      specialization,
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

exports.getSlots = async (req, res) => {
  try {
    const { id } = req.query;
    if  (!id) {
      return res.status(200).json({
        success: false,
        message: "Please provide Doctor ID",
      });
    }
    const slots = await Doctor.findById({ _id: id }).populate("slots").exec();
    return res.status(200).json({
      success: true,
      slots: slots,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      successs: false,
      message: "Error Getting Doctor By Specialization",
    });
  }
};
