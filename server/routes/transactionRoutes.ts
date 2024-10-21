import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController";

const router: Router = Router();

router.get("/:userId", getTransactions);
router.post("/create", createTransaction);

export default router;
