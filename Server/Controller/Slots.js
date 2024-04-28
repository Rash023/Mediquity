const cron = require("node-cron");
const Slots = require("../Model/Slots");
const Doctor = require("../Model/Doctor");
const jwt = require("jsonwebtoken");

/* ADD SLOTS */
exports.addSlots = async (req, res) => {
  try {
    const { days, time } = req.body;
    const token =
      req.body.token || req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const doctor = await Doctor.findById(id);
    const existingSlots = await Slots.find({ doctorId: doctor._id });
    const newSlots = days
      .map((day) => ({
        doctorId: doctor._id,
        day,
        time,
      }))
      .filter((newSlot) => {
        return !existingSlots.some(
          (existingSlot) =>
            existingSlot.day === newSlot.day &&
            existingSlot.time === newSlot.time
        );
      });
    const createdSlots = await Slots.insertMany(newSlots);
    const newSlotIds = createdSlots.map((slot) => slot._id);
    doctor.slots.push(...newSlotIds);
    await doctor.save();
    return res.status(200).json({
      success: true,
      message: "New Slots added Successfully",
      newSlotIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* GET SLOTS */
exports.getSlots = async (req, res) => {
  try {
    const token =
      req.body.token || req.header("Authorization").replace("Bearer", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const response = await Slots.find({ doctorId: id });
    const responseFilter = response.map((slot) => ({
      ...slot.toObject(),
      isFull: slot.appointments.length >= 4,
    }));
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

/* CRON JOB TO UPDATE SLOT STATUS */
cron.schedule("* * * * *", async () => {
  try {
    const currentDate = new Date();
    const slots = await Slots.find();
    for (const slot of slots) {
      const day = slot.day;
      const time = slot.time;
      const dayParts = day.split(".");
      const parsedDay = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);
      const timeParts = time.split("-");
      const endTimeParts = timeParts[1].split(":");
      const parsedEndtime = new Date(parsedDay);
      parsedEndtime.setHours(parseInt(endTimeParts[0], 10));
      parsedEndtime.setHours(parseInt(endTimeParts[1], 10));
      parsedEndtime.setSeconds(0);
      if (parsedEndtime < currentDate) {
        const newDate = new Date(
          new Date(
            parseInt(dayParts[2], 10),
            parseInt(dayParts[1], 10) - 1,
            parseInt(dayParts[0], 10)
          ).getTime() +
            7 * 24 * 60 * 60 * 1000
        );
        const newDay = newDate.getDate();
        const newMonth = newDate.getMonth() + 1;
        const newYear = newDate.getFullYear();
        slot.day = newDay + "." + newMonth + "." + newYear;
        slot.appointments = [];
        await slot.save();
      }
    }
  } catch (error) {
    console.error("Error updating slots:", error);
  }
});
