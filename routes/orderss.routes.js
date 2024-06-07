import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controller/orderss.controller.js";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getAllOrders); // Admin only
router.get("/orders/:id", getOrderById); // Admin only
router.put("/orders/:id", updateOrder); // Admin only
router.delete("/orders/:id", deleteOrder); // Admin only

export default router;
