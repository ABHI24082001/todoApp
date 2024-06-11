

import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const router = express.Router();

// Task routes
router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:taskId", getTaskById);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;
