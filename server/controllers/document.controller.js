import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Document from "../mongodb/models/document.js";
import User from "../mongodb/models/user.js";
import deleteUpload from "../middlewares/deleteuploads-middleware.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllDocuments = async (req, res) => {
  try {
    const data = await Document.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Internal server error", error);
  }
};

const sendFile = async (req, res) => {
  try {
    const { title } = req.body;
    // console.log(title);
    res.status(200).json("Successful");
  } catch (error) {
    res.status(500).json("Internal server error", error);
  }
};

const createDocument = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { title, description, documentType, email } = req.body;

    const userExists = await User.findOne({ email });
    // console.log(userExists);

    if (!userExists) throw new Error("User not found");

    // upload.single('pdf');

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // Treat the file as raw data
      folder: "pdfs", // Optional folder to store the PDF
      use_filename: true,
      unique_filename: false,
    });

    // console.log(result);

    const documentCreated = await Document.create({
      title,
      description,
      documentType,
      // downloadUrl,
      downloadUrl: result.secure_url,
      creator: userExists._id,
    });

    userExists.allDocuments.push(documentCreated._id);
    await userExists.save();

    deleteUpload(req, res, next);

    res.status(200).json(documentCreated);
  } catch (error) {
    res.status(500).json("Internal server error", error);
  }
};

const getSpecificDocument = async (req, res) => {
  try {
    const { id } = req.params; // Accessing the ID from URL parameters

    const documentFound = await Document.findById(id).populate("creator");
    if (!documentFound) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(documentFound);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    // console.log(req.body);
    const { id, title, description, documentType, downloadUrl, email } =
      req.body;

    const userExists = await User.findOne({ email });
    // console.log(userExists);

    if (!userExists) throw new Error("User not found");

    const updateDocument = await Document.findByIdAndUpdate(id, {
      title,
      description,
      documentType,
      downloadUrl,
    });

    res.status(200).json(updateDocument);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const downloadFile = async (req, res) => {
  try {
    const { filename } = req.body;
    // const {filename} = req.params;
    // filepath = `/v1712068981/pdfs/${filename}`;
    // https://res.cloudinary.com/debbboid4/raw/upload/v1712068981/pdfs/1712068979500Resume.pdf
    // console.log(req.body);
    const file = cloudinary.url(filename, { resource_type: "raw" });
    // console.log(file);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.redirect(file);
  } catch (error) {
    res.status(500).json("Internal server error", error);
  }
};

export {
  getAllDocuments,
  createDocument,
  getSpecificDocument,
  updateDocument,
  sendFile,
  downloadFile,
};
