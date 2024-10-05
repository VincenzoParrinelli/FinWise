import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";

const router: Router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);

export default router;
