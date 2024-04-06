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

require("./Configuration/database").connect();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinaryConnect();
app.use("/api/v1/predict", predictionRoute);
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});



app.use("/api/v1/user", userRoute);
app.use("/api/v1/doctor",doctorRoute);
