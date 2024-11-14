import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.post("/create", createTransaction);
router.delete("/delete/:id", deleteTransaction);

export default router;
