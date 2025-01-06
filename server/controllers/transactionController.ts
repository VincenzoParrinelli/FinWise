import { Request, Response, NextFunction } from "express";

import * as transactionService from "../services/transactionService";

export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    next(err);
  }
};

export const getRandomGroupedTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user._id.toString();

  try {
    const randomGroupedTransactions =
      await transactionService.getRandomGroupedTransactions(userId);

    res.status(200).json(randomGroupedTransactions);
  } catch (err) {
    next(err);
  }
};

export const getTransactionsByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const date = new Date(req.params.date);
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const filteredByDateTransactions =
      await transactionService.getTransactionsByDate(
        userId,
        date,
        page,
        pageSize
      );

    res.status(200).json(filteredByDateTransactions);
  } catch (err) {
    next(err);
  }
};

export const getTransactionsBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user._id.toString();

  try {
    const searchedTransactions =
      await transactionService.getTransactionsBySearch(userId, req.query);

    res.status(200).json(searchedTransactions);
  } catch (err) {
    next(err);
  }
};

export const getGroupedTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    next(err);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { transaction, savingId } = req.body;
  const date = new Date(transaction.date);
  const userId = res.locals.user._id.toString();

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const newTransaction = await transactionService.createTransaction(
      userId,
      savingId,
      transaction
    );

    res.status(201).json(newTransaction);
  } catch (err) {
    next(err);
  }
};

export const editTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { updatedTransaction, id } = req.body;

  try {
    await transactionService.editTransaction(id, updatedTransaction);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const transactionId = req.params.id.toString();

  try {
    await transactionService.deleteTransaction(transactionId);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
