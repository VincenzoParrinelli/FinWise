import { Router } from "express";
import { createUser } from "../controllers/userController";

const router: Router = Router();

router.post("/create-user", createUser);

export default router;
