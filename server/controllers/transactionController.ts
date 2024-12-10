import { Request, Response } from "express";

import * as transactionService from "../services/transactionService";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const savingId = req.query.savingId as string;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const transactions = await transactionService.getTransactions(
      userId,
      savingId,
      page,
      pageSize
    );

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getGroupedTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const { group } = req.params;

  try {
    const groupedTransactions = await transactionService.getGroupedTransactions(
      userId,
      group
    );

    res.status(200).json(groupedTransactions);
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

    const newTransaction = transactionService.createTransaction(
      userId,
      savingId,
      transaction
    );

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
    await transactionService.editTransaction(id, updatedTransaction);

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
    await transactionService.deleteTransaction(transactionId);

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
