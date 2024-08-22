import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const AddUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    await newUser.save();
    let { password, ...userdata } = newUser._doc;
    return res.status(200).json({ user: userdata });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: `Email Already Exist` });
    }
    return res.status(500).json(err.message);
  }
};
export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(203).json({ message: "user not found" });
    }
    const { password: userpassword, ...userdata } = user._doc;
    const match_password = await bcrypt.compare(password, userpassword);

    if (match_password) {
      const accessToken = jwt.sign(userdata, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(userdata, process.env.REFRESH_SECRET_KEY);
      // Set the token in an HTTP-only cookie
      res.cookie("token", accessToken, {
        httpOnly: true, // The cookie is not accessible via JavaScript
        secure: true, // Set to true in production for HTTPS
        sameSite: "strict", // Helps prevent CSRF attacks
        maxAge: 3600000, // 1 hour (in milliseconds)
      });
      res.cookie("refreshtoken", accessToken, {
        httpOnly: true, // The cookie is not accessible via JavaScript
        secure: true, // Set to true in production for HTTPS
        sameSite: "strict", // Helps prevent CSRF attacks
        maxAge: 12 * 60 * 60 * 1000, // 1 hour (in milliseconds)
      });
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("Refresh", `Bearer ${refreshToken}`);
      return res
        .status(200)
        .json({ user: { ...userdata, accessToken, refreshToken } });
    } else {
      return res.status(203).json({ message: "password not match" });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const GetAllUsers = async (req, res) => {
  try {
    const AllUsers = await User.find({}).select("-password");
    return res.status(200).json({ user: AllUsers });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const UpdateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    const updatedUser = await User.findOne({ _id: req.params.id }).select(
      "-password"
    );
    return res.status(200).json({ user: updatedUser, message: "user updated" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const LogoutUser = async (req, res) => {
  const token = req?.headers?.cookie || null;

  try {
    if (token === undefined || token === null) {
      return res.status(400).json({
        message: "No token found, user already logged out or not logged in",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Should match how the cookie was set
      sameSite: "strict",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true, // Should match how the cookie was set
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User Logout Successfully" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
