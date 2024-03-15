const jwt = require("jsonwebtoken");
const Medication = require("../models/Medication");
const User = require("../models/User");

exports.createMedication = async (req, res) => {
  try {
    // Decode token to get user ID
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Fetch user from DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const { medicineName, type, dosage, days, times } = req.body;

    // Create medication entity
    const medication = new Medication({
      userId: userId,
      name: medicineName,
      type: type,
      dosage: dosage,
      days: days,
      times: times,
    });

    // Save medication to DB
    await medication.save();

    return res.status(200).json({
      success: true,
      message: "Medication Added Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
