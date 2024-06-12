// routes/categories.js

import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
