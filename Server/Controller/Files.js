const File = require("../Model/Files");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;

/* HELPER FUNCTION TO UPLOAD FILE TO CLOUDINARY */
async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

/* HELPER FUNCTION TO CHECK IF GIVEN FILE IS SUPPORTED */
function isFileTypeSupported(type, supportTypes) {
  return supportTypes.includes(type);
}

/* UPLOAD FILES FOR USER */
exports.fileuploader = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    const filename = req.body.filename;
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const file = req.files.file;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }
    const user = await User.findById({ _id: userId });
    const supportedTypes = ["jpg", "png", "pdf", "jpeg", "docx"];
    const type = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(type, supportedTypes)) {
      return res.status(401).json({
        success: false,
        message: "File type not supported",
      });
    }
    const response = await uploadFiletoCloudinary(
      file,
      `Mediquity/${user._id}`
    );
    const uploadedFile = await File.create({
      userId,
      filename: filename,
      fileUrl: response.secure_url,
    });
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $push: {
          files: uploadedFile._id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      url: file.secure_url,
      message: "File uploaded Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* SEARCH FILE */
exports.SearchFile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    const { searchQuery } = req.body;
    const regex = new RegExp(searchQuery, "i");
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const files = await File.find({
      userId: userId,
      filename: { $regex: regex },
    });
    console.log(files);
    return res.status(200).json({
      success: true,
      files: files,
      message: "Successfully Fetched Files",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* GET FILES */
exports.getFiles = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token not found in Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const files = await File.find({ userId: userId });
    return res.status(200).json({
      success: true,
      data: files,
      message: "Files Fetched Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
};
