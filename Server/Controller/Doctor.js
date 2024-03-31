const bcrypt = require("bcrypt");
const Model = require("../Model/Doctor");
const Slots = require("../Model/Slots");
const jwt = require("jsonwebtoken");

exports.docSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      slots: { days, time },
    } = req.body;

    const existingUser = await Model.findOne({ email });

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

    //creating the entry for the doctor

    await Model.create({
      name,
      email,
      password: hashPassword,
      specialization,
    });

    const user = await Model.findOne({ email });

    //adding all the slots to the slots schema
    for (const day of days) {
      const slot = new Slots({
        doctorId: user._id,
        day,
        time,
      });
      const savedSlot = await slot.save();
    }
    const id = user._id;

    const foundSlots = await Slots.find({ doctorId: id });

    if (!foundSlots || foundSlots.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Doctor created successfully",
      });
    }

    const updatedDoctor = await Model.findByIdAndUpdate(
      id,
      { $push: { slots: { $each: foundSlots.map((slot) => slot._id) } } },
      { new: true }
    );

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

exports.docLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the details carefully",
      });
    }

    let user = await Model.findOne({ email });

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
