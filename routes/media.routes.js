// routes/mediaRoutes.js
import express from "express";
import upload from "../config/multer.js";
import {
  uploadMedia,
  getAllMedia,
  deleteMedia,
} from "../controller/media.controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/", getAllMedia);
router.delete("/:mediaId", deleteMedia);

export default router;
