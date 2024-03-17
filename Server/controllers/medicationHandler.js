const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cron = require("node-cron");
const Medication = require("../models/Medication"); // Import your Medication model
const mailSender = require("../Configuration/nodemailer");

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

    // Convert times to hh:mm format
    const formattedTimes = times.map((time) => {
      const timeString = new Date(time);
      const hours = timeString.getHours().toString().padStart(2, "0");
      const minutes = timeString.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    });

    // Convert days array to array of selected days
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].filter((day, index) => days[index]);

    // Create medication entity
    const medication = new Medication({
      userId: userId,
      name: medicineName,
      type: type,
      dosage: dosage,
      days: daysOfWeek,
      times: formattedTimes,
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

// Function to check medication schedule and send reminders
// Function to check medication schedule and send reminders
const checkMedicationSchedule = async () => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    // Query Medication collection
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
          console.log("HI");
          await mailSender(user.email, medication.name, medicationTime);
        }
      }
    }
  } catch (error) {
    console.error("Error checking medication schedule:", error);
  }
};

cron.schedule("* * * * *", checkMedicationSchedule);
