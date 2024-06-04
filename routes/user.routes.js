import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
  viewProfile,
  Deleted,
  forgotPassword,
  resetPassword,
  logoutUser,
  updateUserProfile,
  deleteUserProfile,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/users.controller.js";

const router = Router()

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", Deleted);
router.post("/forgotPassword", forgotPassword);     // pending request
router.post("/resetPassword/:token", resetPassword);  // pending request
router.post("/logout/:userId", logoutUser);

// **viewProfile

router.get("/profile/:userId", viewProfile);
router.put("/profile/:userId", updateUserProfile);
router.delete("/deleteprofile/:userId", deleteUserProfile);

// Product routes

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;