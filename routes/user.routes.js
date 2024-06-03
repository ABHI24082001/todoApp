import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser
} from "../controller/users.controller.js";

const router = Router()

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.put("/update/:userId", updateUser);



export default router;