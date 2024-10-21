import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/transactionModel";
import User from "../models/userModel";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.userId;

  try {
    const transactions = await Transaction.find({ userId });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = req.body;
  const date = new Date(req.body.date);
  const userId = req.body.userId;

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const newTransaction: ITransaction = new Transaction({
      ...transaction,
      userId,
    });
    newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
