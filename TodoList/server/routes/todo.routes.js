import express from "express";

import {
  AddTodo,
  DeleteTodo,
  UpdateTodo,
  GetAllTodos,
  GetTodoById,
  ToogleTodoAvailability,
} from "../controllers/Todo.controller.js";

const router = express.Router();
router.get("/", GetAllTodos);
router.post("/", AddTodo);
router.delete("/:id", DeleteTodo);
router.patch("/:id", UpdateTodo);
router.get("/:id", GetTodoById);
router.patch("/available/:id", ToogleTodoAvailability);

export default router;
