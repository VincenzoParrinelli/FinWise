import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.patch("/update", authMiddleware, updateUser);

export default router;
