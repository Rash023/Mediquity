const { cloudinaryConnect } = require("../Configuration/Cloudinary");
const File = require("../Model/Files");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;

async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function isFileTypeSupported(type, supportTypes) {
  return supportTypes.includes(type);
}

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

exports.SearchFile = async (req, res) => {
  try {
    const token = req.body.token;
    const { name } = req.body;
    if(!token) {
      return res.status.json({
        success: false,
        message: "Token is missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const user = await File.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const foundFile = await user.files.find((file) => file.filename === name);

    if (!foundFile) {
      return res.status(200).json({
        success: true,
        message: "File not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: foundFile,
        message: "File found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status.json({
        success: false,
        message: "Token not found",
      });
    }

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const Data = await File.findOne({ userId: userId });

    return res.status(200).json({
      success: true,
      data: Data,
      message: "Files Fetched Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
};
