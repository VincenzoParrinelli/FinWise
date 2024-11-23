import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/transactionModel";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const savingId = req.query.savingId as string;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    let totals = [];

    if (!savingId) {
      totals = await Transaction.aggregate([
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
            totalTransactionsInDb: { $sum: 1 },
          },
        },
        {
          $project: { _id: 0 },
        },
      ]);
    } else {
      totals = await Transaction.aggregate([
        { $match: { savingId } },
        {
          $group: {
            _id: null,
            totalSavingsTransactionsInDb: { $sum: 1 },
          },
        },
        {
          $project: { _id: 0 },
        },
      ]);
    }

    const transactions = await Transaction.find(
      savingId ? { savingId } : { userId }
    )
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
  const { transaction, savingId } = req.body;
  const date = new Date(transaction.date);
  const userId = res.locals.user._id.toString();

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const newTransaction: ITransaction = new Transaction({
      ...transaction,
      userId: savingId ? undefined : userId,
      savingId: savingId || undefined,
    });
    newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const editTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { updatedTransaction, id } = req.body;

  try {
    await Transaction.updateOne({ _id: id }, { $set: updatedTransaction });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transactionId = req.params.id.toString();

  try {
    await Transaction.deleteOne({ _id: transactionId });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
