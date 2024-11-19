import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import {
  getSavings,
  createSaving,
  deleteSaving,
} from "../controllers/savingController";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getSavings);
router.post("/create", createSaving);
router.delete("/delete/:id", deleteSaving);

export default router;
