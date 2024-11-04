import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.post("/create", createTransaction);

export default router;
