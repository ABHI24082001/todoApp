import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchAndFilterTasks
} from "../controller/task.controller.js";

const router = Router();

router.get("/search", searchAndFilterTasks);
router.post("/", createTask); // Create a new task
router.get("/", getAllTasks); // Get all tasks
router.get("/:taskId", getTaskById); // Get a task by ID
router.put("/:taskId", updateTask); // Update a task
router.delete("/:taskId", deleteTask); // Delete a task


export default router;
