import express from "express";
import multer from "multer";
import path from "node:path";
import {
  getAllDocuments,
  createDocument,
  getSpecificDocument,
  updateDocument,
  sendFile,
  downloadFile,
} from "../controllers/document.controller.js";

const router = express.Router();

const storageConfig = multer.diskStorage({
  // destinations is uploads folder
  // under the project directory
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

router.route("/").get(getAllDocuments);
router.route("/test").get(downloadFile);
router.route("/create").post(upload.single("pdf"), createDocument);
router.get("/finddocument/:id", getSpecificDocument);
router.route("/updatedocument").patch(updateDocument);

export default router;
