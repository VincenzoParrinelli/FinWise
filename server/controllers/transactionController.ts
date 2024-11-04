import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/transactionModel";
import User from "../models/userModel";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const totals = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$amount" },
          totalIncome: {
            $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
          },
          totalExpenses: {
            $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
          },
          totalDocuments: { $sum: 1 },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);

    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(10)
      .lean();

    res.status(200).json({ transactions, ...totals[0] });
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
  const userId = res.locals.user._id.toString();

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
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
