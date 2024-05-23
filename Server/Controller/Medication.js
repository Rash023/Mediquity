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
        message: "User not found",
      });
    }
    const { medicineName, type, dosage, days, times } = req.body;
    const formattedTimes = times.map((time) => {
      const timeString = new Date(time);
      const hours = timeString.getHours().toString().padStart(2, "0");
      const minutes = timeString.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    });
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
      times: formattedTimes,
    });
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

/* CRON FUNCTION TO PING USER FOR MEDICATION */
const checkMedicationSchedule = async () => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    const medications = await Medication.find({
      days: { $elemMatch: { $eq: currentDay } },
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


//handler to delete medication of the user
exports.deleteMedication = async (req, res) => {
  try {
    const token =
      req.body.token || req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const user = User.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Uesr not logged in",
      });
    }

    const { medicationId } = req.body;
    await Medication.deleteOne({ _id: medicationId, userId: id });

    return res.status(200).json({
      success: true,
      message: "Medication deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      sucecss: false,
      message: "Internal Server Error",
    });
  }
};

//handler to get all the medications
exports.getMedications = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Uesr not logged in",
      });
    }

    const response = await Medication.find({ userId: id });

    return res.status(200).json({
      success: true,
      message: "Data fetched succesfully",
      data: response,
    });
  } catch (erorr) {
    return res.status(500).json({
      sucecss: false,
      message: "Internal Server Error",
    });
  }
};

