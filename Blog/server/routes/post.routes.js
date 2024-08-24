import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  AddPost,
  GetAllPost,
  DeletePost,
  GetPostDetails,
} from "../controllers/post.controller.js";
const router = express.Router();
router.post("/", upload.single("coverImage"), AddPost);
router.get("/", GetAllPost);
router.get("/:id", GetPostDetails);
router.delete("/:id", DeletePost);
export default router;
