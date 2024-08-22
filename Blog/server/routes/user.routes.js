import express from "express";
import {
  AddUser,
  DeleteUser,
  GetAllUsers,
  Signin,
  LogoutUser,
  UpdateUser,
} from "../controllers/user.controller.js";
const router = express.Router();
router.post("/", AddUser);
router.delete("/:id", DeleteUser);
router.get("/", GetAllUsers);
router.post("/signin", Signin);
router.patch("/:id", UpdateUser);
router.get("/logout", LogoutUser);
export default router;
