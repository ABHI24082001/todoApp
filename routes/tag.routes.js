// routes/tags.js

import { Router } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controller/tag.controller.js";

const router = Router();

router.post("/", createTag);
router.get("/", getAllTags);
router.get("/:tagId", getTagById);
router.put("/:tagId", updateTag);
router.delete("/:tagId", deleteTag);

export default router;
