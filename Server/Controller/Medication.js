const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const cron = require("node-cron");
const Medication = require("../Model/Medication");
const { medicationEmail } = require("../Mail/Template/MedicationForm");
const mailSender = require("../Util/MailSender");

/* CREATE MEDICATION FOR USER */
exports.createMedication = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const { medicineName, type, dosage, days, times } = req.body;
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].filter((_, index) => days[index]);
    const medication = new Medication({
      userId: userId,
      name: medicineName,
      type: type,
      dosage: dosage,
      days: daysOfWeek,
      times: times,
    });
    const savedMedication = await medication.save();
    await User.findByIdAndUpdate(user._id, {
      $push: {
        medications: savedMedication,
      },
    });
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

/* CRON FUNCTION TO PING USER FOR MEDICATION */
const checkMedicationSchedule = async () => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    const medications = await Medication.find({
      days: { $elemMatch: { $eq: currentDay } },
      status: "Live",
    }).populate("userId");
    for (const medication of medications) {
      for (const time of medication.times) {
        const timeParts = time.split(":");
        const medicationTime =
          parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        if (currentTime === medicationTime - 5) {
          const user = await User.findById(medication.userId);
          await mailSender(
            user.email,
            "Medication Reminder",
            medicationEmail(
              user.name,
              medication.name,
              medication.type,
              medication.dosage,
              time
            )
          );
        }
      }
    }
  } catch (error) {
    console.error("Error checking medication schedule:", error);
  }
};

/* CRON JOB */
cron.schedule("* * * * *", checkMedicationSchedule);

/* DELETE MEDICATION FOR USER */
exports.deleteMedication = async (req, res) => {
  try {
    const token =
      req.body.token || req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const user = User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const { medicationId } = req.body;
    const medication = await Medication.findOne({
      _id: medicationId,
      userId: id,
    });
    if (!medication) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this Medication",
      });
    }

    await Medication.deleteOne({ _id: medicationId, userId: id });

    return res.status(200).json({
      success: true,
      message: "Medication Deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      sucecss: false,
      message: "Internal Server Error",
    });
  }
};

/* GET ALL MEDICATIONS */
exports.getMedications = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const response = await Medication.find({ userId: user._id });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all Medications",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      sucecss: false,
      message: "Internal Server Error",
    });
  }
};

/* UPDATE MEDICATION STATUS */
exports.updateMedicationStatus = async (req, res) => {
  try {
    const { medicationId, status } = req.body;
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const medication = await Medication.findById(medicationId);
    if (!medication) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid Medication ID",
      });
    }

    if (!medication.userId.equals(user._id)) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to update this Medication",
      });
    }

    await Medication.findByIdAndUpdate(medicationId, {
      status: status,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully updated Medication status",
    });
  } catch (erorr) {
    return res.status(500).json({
      sucecss: false,
      message: "Internal Server Error",
    });
  }
};
