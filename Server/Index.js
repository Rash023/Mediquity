const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const predictionRoute = require("./Route/Prediction");
const userRoute = require("./Route/User");
const doctorRoute = require("./Route/Doctor");
const medicationRoute = require("./Route/Medication");

/* ENV */
dotenv.config();

/* CONNECT TO DB */
require("./Configuration/Database").connect();

/* API TESTING */
app.use(express.json());

/* CORS */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* FILE UPLOAD */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* CLOUDINARY */
cloudinaryConnect();

/* CONNECT TO PORT */
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

/* MOUNT ROUTES */
app.use("/api/v1/user", userRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/predict", predictionRoute);
app.use("/api/v1/medication", medicationRoute);
