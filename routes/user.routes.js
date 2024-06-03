import { Router } from "express";
import { createUser, loginUser } from "../controller/users.controller.js";

const router = Router()

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
// router.get("./getUser",  getUser);


export default router;