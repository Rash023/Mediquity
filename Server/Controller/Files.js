const { cloudinaryConnect } = require("../Configuration/Cloudinary");
const File = require("../Model/Files");
const User = require("../Model/User");

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
    const { userId, filename, tags } = req.body;
    const file = req.files.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const supportedTypes = ["jpg", "png", "pdf", "jpeg", "docx"];
    const type = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(type, supportedTypes)) {
      return res.status(401).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFiletoCloudinary(file, "Docs");

    const fileData = {
      filename,
      fileUrl: response.secure_url,
      tags,
    };

    const user = await File.findById(userId);

    if (!user) {
      const entry = await File.create({
        userId,

        files: fileData,
      });

      return res.status(200).json({
        success: true,
        message: "File uploaded Succesfully",
      });
    } else {
      user.files.push(fileData);

      return res.status(200).json({
        success: false,
        message: "File Uploaded Sucesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//controller to search the file

exports.SearchFile = async (req, res) => {
  try {
    const { userId, Name } = req.body;

    const user = await File.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const foundFile = await user.files.find((file) => file.filename === Name);

    if (!foundFile) {
      return res.status(200).json({
        success: true,
        message: "File not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "File found",
        foundFile,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
