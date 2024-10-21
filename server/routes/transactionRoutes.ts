import { Router } from "express";
import { createTransaction } from "../controllers/transactionController";

const router: Router = Router();

router.post("/create", createTransaction);

export default router;
