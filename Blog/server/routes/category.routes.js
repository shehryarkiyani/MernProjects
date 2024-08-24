import express from "express";
import {
  AddCategory,
  GettAllCategories,
  UpdateCategory,
  DeleteCategory,
  GetCategoryById,
} from "../controllers/category.controller.js";
import { AuthenticatedUser } from "../middlewares/authmiddleware.js";
const router = express.Router();
router.get("/", AuthenticatedUser, GettAllCategories);
router.get("/:id", AuthenticatedUser, GetCategoryById);
router.post("/", AuthenticatedUser, AddCategory);
router.patch("/:id", AuthenticatedUser, UpdateCategory);
router.delete("/:id", AuthenticatedUser, DeleteCategory);
export default router;
