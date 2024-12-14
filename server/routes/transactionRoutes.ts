import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getTransactions,
  getTransactionsByDate,
  getGroupedTransactions,
  createTransaction,
  deleteTransaction,
  editTransaction,
} from "../controllers/transactionController";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.get("/:date", getTransactionsByDate);
router.get("/grouped/:group", getGroupedTransactions);
router.post("/create", createTransaction);
router.patch("/edit", editTransaction);
router.delete("/delete/:id", deleteTransaction);

export default router;
