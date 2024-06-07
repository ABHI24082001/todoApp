import { Router } from "express";
import {
  getAllCart,
  addAllCartById,
  updateAllCartById,
  deleteAllCartById,
} from "../controller/cart.controller.js";

const router = Router();

router.get("/cart", getAllCart);
router.post("/cart", addAllCartById);
router.put("/cart/:id", updateAllCartById);
router.delete("/cart/:id", deleteAllCartById);

export default router;
