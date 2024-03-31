import express from "express";

import {
  createUser,
  getAllUsers,
  getUserInfoByID,
  userLogin,
} from "../controllers/user.controller.js";

import signupSchema from "../validators/auth-validator.js";
import validate from "../middlewares/validate-middleware.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(validate(signupSchema), createUser);
router.route("/:id").get(getUserInfoByID);
router.route("/login").post(userLogin);

export default router;
