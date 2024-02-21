import express from "express";

import {
  getAllDocuments,
  createDocument,
  getSpecificDocument,
  updateDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.route("/").get(getAllDocuments);
router.route("/create").post(createDocument);
router.route("/finddocument").get(getSpecificDocument);
router.route("/updatedocument").patch(updateDocument);

export default router;
