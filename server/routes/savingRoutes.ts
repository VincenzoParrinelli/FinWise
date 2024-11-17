import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import { createSaving } from "../controllers/savingController";

const router: Router = Router();

router.use(authMiddleware);

router.post("/create", createSaving);

export default router;
