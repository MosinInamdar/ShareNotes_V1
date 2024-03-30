import User from "../mongodb/models/user.js";
import bcrypt from "bcryptjs";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json(userExists);

    const newUser = await User.create({
      name,
      email,
      password,
      // avatar,
    });

    res.status(201).json({ newUser, toekn: await newUser.generateToken() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate("allDocuments");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await bcrypt.compare(password, userExists.password);

    if (user) {
      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: await userExists.generateToken(),
        });
    } else {
      res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoByID, userLogin };
