import { Router } from "express";
import {
  shareTask,
  assignTask,
  getTasksForUser,
} from "../controller/collaboration.controller.js";

const router = Router();

router.post("/share/:taskId", shareTask);
router.post("/assign/:taskId", assignTask);
router.get("/:userId/tasks", getTasksForUser);

export default router;
