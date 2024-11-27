import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import {
  getSavings,
  createSaving,
  deleteSaving,
  editSaving,
} from "../controllers/savingController";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getSavings);
router.post("/create", createSaving);
router.patch("/edit", editSaving);
router.delete("/delete/:id", deleteSaving);

export default router;
