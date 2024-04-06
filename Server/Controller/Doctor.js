const bcrypt = require("bcrypt");
const Doctor = require("../Model/Doctor");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

<<<<<<< Updated upstream
//function to upload files to cloudinary
async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
=======
//controller for doctor Signup

exports.docSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      slots: { days, time },
    } = req.body;
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
    const user = await Model.findOne({ email });

    //adding slots in the slots schema
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

    //updating the doctor data with the slots object id
    const updatedDoctor = await Model.findByIdAndUpdate(
      id,
      { $push: { slots: { $each: foundSlots.map((slot) => slot._id) } } },
      { new: true }
    );

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
//login for doctor

exports.login = async (req, res) => {
=======
//controller for doctor login

exports.docLogin = async (req, res) => {
>>>>>>> Stashed changes
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
exports.getSlots = async (req, res) => {
  try {
    const {id} = req.query;
    if (!id) {
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
      message: "Error Getting Slots for the doctor",
    });
  }
};
