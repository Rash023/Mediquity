const cron = require("node-cron");
const mongoose = require("mongoose");
const Slot = require("../Model/Slots");

const start = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Resetting bookings array...");

      const slots = await Slot.find();
      slots.forEach(async (slot) => {
        slot.slots.forEach((slotItem) => {
          slotItem.bookings = [];
        });
        await slot.save();
      });

      console.log("Bookings array reset successfully");
    } catch (error) {
      console.error("Error occurred while resetting bookings array:", error);
    }
  });
};

module.exports = { start };
