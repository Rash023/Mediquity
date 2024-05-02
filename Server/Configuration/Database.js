const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Succesfully"))
    .catch((error) => {
      console.log("Facing issues while connecting to db");
      console.log(error);
      process.exit(1);
    });
};
