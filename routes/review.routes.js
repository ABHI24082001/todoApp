import { Router } from "express";
import {
  addReview,
  getReviews,
  deleteReview,
} from "../controller/review.controller.js";

const router = Router();

router.post("/products/:id/review", addReview);
router.get("/products/:id/reviews", getReviews);
router.delete("/products/:id/reviews/:reviewId", deleteReview);

export default router;
