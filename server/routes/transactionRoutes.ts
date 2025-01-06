import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getTransactions,
  getRandomGroupedTransactions,
  getTransactionsByDate,
  getTransactionsBySearch,
  getGroupedTransactions,
  createTransaction,
  deleteTransaction,
  editTransaction,
} from "../controllers/transactionController";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.get("/random", getRandomGroupedTransactions);
router.get("/search", getTransactionsBySearch);
router.get("/:date", getTransactionsByDate);
router.get("/grouped/:group", getGroupedTransactions);
router.post("/create", createTransaction);
router.patch("/edit", editTransaction);
router.delete("/delete/:id", deleteTransaction);

export default router;
