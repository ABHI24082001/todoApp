import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/note.controller.js";

const router = Router();

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:noteId", getNoteById);
router.put("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
