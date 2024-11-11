import { Router } from "express";
import {
  createUser,
  editPassword,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.patch("/update", authMiddleware, updateUser);
router.patch("/settings/edit/password", authMiddleware, editPassword);
router.delete("/logout", logoutUser);

export default router;
