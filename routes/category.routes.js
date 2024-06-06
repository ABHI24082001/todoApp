// routes/category.routes.js
import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
