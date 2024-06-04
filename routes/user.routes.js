import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
  viewProfile,
  Deleted,
  forgotPassword,
  resetPassword,
} from "../controller/users.controller.js";

const router = Router()

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.put("/update/:userId", updateUser);
router.get("/profile/:userId", viewProfile);
router.delete("/delete/:userId", Deleted);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);



export default router;