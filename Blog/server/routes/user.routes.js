import express from "express";
import { AuthenticatedUser } from "../middlewares/authmiddleware.js";
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
router.delete("/:id", AuthenticatedUser, DeleteUser);
router.get("/", AuthenticatedUser, GetAllUsers);
router.post("/signin", Signin);
router.patch("/:id", AuthenticatedUser, UpdateUser);
router.get("/logout", AuthenticatedUser, LogoutUser);
export default router;
