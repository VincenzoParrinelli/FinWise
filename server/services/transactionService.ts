import Transaction, { ITransaction } from "../models/transactionModel";
import Saving from "../models/savingModel";
import { FilterQuery } from "mongoose";

export const getTransactions = async (
  userId: string,
  savingId: string | undefined,
  page: number,
  pageSize: number
): Promise<{
  totals: any;
  transactions: ITransaction[];
}> => {
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

  return { transactions, ...totals[0] };
};

export const getTransactionsByDate = async (
  userId: string,
  date: Date,
  page: number,
  pageSize: number
): Promise<ITransaction[]> => {
  const startOfTheDay = new Date(date);
  startOfTheDay.setHours(0, 0, 0, 0);

  const endOfTheDay = new Date(date);
  endOfTheDay.setHours(23, 59, 59, 999);

  const filteredByDateTransactions = await Transaction.find({
    userId,
    date: {
      $gte: startOfTheDay,
      $lte: endOfTheDay,
    },
  })
    .sort({ date: -1 })
    .skip((page - 1) * pageSize)
    .limit(10)
    .lean();

  return filteredByDateTransactions;
};

export const getTransactionsBySearch = async (
  userId: string,
  query: any
): Promise<ITransaction[]> => {
  const { search, categories, date, categoryRadio, page, pageSize } = query;

  const matchConditions = {
    userId,
  } as FilterQuery<any>;

  if (search) {
    matchConditions.transactionTitle = {
      $regex: search,
      $options: "i",
    };
  }

  if (date) {
    const startOfTheDay = new Date(date);
    startOfTheDay.setHours(0, 0, 0, 0);

    const endOfTheDay = new Date(date);
    endOfTheDay.setHours(23, 59, 59, 999);

    matchConditions.date = {
      $gte: startOfTheDay,
      $lte: endOfTheDay,
    };
  }

  if (categoryRadio) {
    if (categoryRadio === "income" && !categories?.length) {
      matchConditions.category = "Salary";
    } else if (categoryRadio === "expense") {
      matchConditions.category = { $ne: "Salary" };
    }
  }

  if (categories) {
    const categoryArray = categories.split(",");
    matchConditions.category = { $in: categoryArray };
  }

  const totalSearchedTransactionsInDb = await Transaction.aggregate([
    { $match: matchConditions },
    {
      $group: {
        _id: null,
        totalSearchedTransactionsInDb: { $sum: 1 },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  const searchedTransactions = await Transaction.find(matchConditions)
    .sort({ date: -1, _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(10)
    .lean();

  return { searchedTransactions, ...totalSearchedTransactionsInDb[0] };
};

export const getGroupedTransactions = async (
  userId: string,
  group: string
): Promise<any> => {
  switch (group) {
    case "Daily":
      return getDailyTransactions(userId);

    case "Weekly":
      return getWeeklyTransactions(userId);

    case "Monthly":
      return getMonthlyTransactions(userId);

    case "Yearly":
      return getYearlyTransactions(userId);
  }
};

export const createTransaction = async (
  userId: string,
  savingId: string | undefined,
  transaction: ITransaction
): Promise<ITransaction> => {
  if (savingId) {
    await Saving.updateOne(
      { userId },
      { $inc: { savedAmount: transaction.amount } }
    );
  }

  const newTransaction = new Transaction({
    ...transaction,
    userId: savingId ? undefined : userId,
    savingId: savingId || undefined,
  });

  await newTransaction.save();
  return newTransaction;
};

export const editTransaction = async (
  id: string,
  updatedTransaction: Partial<ITransaction>
): Promise<void> => {
  await Transaction.updateOne({ _id: id }, { $set: updatedTransaction });
};

export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  await Transaction.deleteOne({ _id: transactionId });
};

const getDailyTransactions = async (userId: string): Promise<any[]> => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const dailyTransactions = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfWeek,
          $lt: endOfWeek,
        },
      },
    },
    {
      $addFields: {
        weekDay: { $isoDayOfWeek: "$date" },
      },
    },
    {
      $group: {
        _id: "$weekDay",
        totalIncome: {
          $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
        },
        totalExpenses: {
          $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
        },
      },
    },
    {
      $project: {
        dayOfWeek: "$_id",
        totalIncome: 1,
        totalExpenses: 1,
        _id: 0,
      },
    },
    { $sort: { dayOfWeek: 1 } },
  ]);

  return dailyTransactions;
};

const getWeeklyTransactions = async (userId: string): Promise<any[]> => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const weeklyTransactions = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
    },
    {
      $addFields: {
        weekOfMonth: { $ceil: { $divide: [{ $dayOfMonth: "$date" }, 7] } },
      },
    },
    {
      $group: {
        _id: "$weekOfMonth",
        totalIncome: {
          $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
        },
        totalExpenses: {
          $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
        },
      },
    },
    {
      $project: {
        weekOfMonth: "$_id",
        totalIncome: 1,
        totalExpenses: 1,
        _id: 0,
      },
    },
    { $sort: { week: 1 } },
  ]);

  return weeklyTransactions;
};

const getMonthlyTransactions = async (userId: string): Promise<any[]> => {
  const currDate = new Date();
  const endOfMonth = new Date(currDate);
  endOfMonth.setDate(1);
  endOfMonth.setHours(23, 59, 59, 999);

  const startOfLast7Months = new Date(currDate);
  startOfLast7Months.setMonth(currDate.getMonth() - 7);
  startOfLast7Months.setDate(1);
  startOfLast7Months.setHours(0, 0, 0, 0);

  const monthlyTransactions = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfLast7Months,
          $lte: endOfMonth,
        },
      },
    },
    {
      $addFields: {
        month: { $month: "$date" },
      },
    },
    {
      $group: {
        _id: "$month",
        totalIncome: {
          $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
        },
        totalExpenses: {
          $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
        },
      },
    },
    {
      $project: {
        month: "$_id",
        totalIncome: 1,
        totalExpenses: 1,
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  return monthlyTransactions;
};

const getYearlyTransactions = async (userId: string): Promise<any[]> => {
  const currDate = new Date();
  const endOfYear = new Date(currDate);
  endOfYear.setMonth(11, 31);
  endOfYear.setHours(23, 59, 59, 999);

  const startOflast7Years = new Date(currDate);
  startOflast7Years.setFullYear(currDate.getFullYear() - 7, 0, 1);
  startOflast7Years.setHours(0, 0, 0, 0);

  const yearlyTransactions = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOflast7Years,
          $lte: endOfYear,
        },
      },
    },
    {
      $addFields: {
        year: { $year: "$date" },
      },
    },
    {
      $group: {
        _id: "$year",
        totalIncome: {
          $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
        },
        totalExpenses: {
          $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
        },
      },
    },
    {
      $project: {
        year: "$_id",
        totalIncome: 1,
        totalExpenses: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1 },
    },
  ]);

  return yearlyTransactions;
};
