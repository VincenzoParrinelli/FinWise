import Transaction from "../models/transactionModel";

export const getGroupedTransactions = async (
  group: string,
  userId: string
): Promise<any> => {
  switch (group) {
    case "Daily":
      return getDailyTransactions(userId);

    case "Weekly":
      return getWeeklyTransactions(userId);

    case "Monthly":
      return getMonthlyTransactions(userId);
  }
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
  const startOfYear = new Date();
  startOfYear.setMonth(0, 1);
  startOfYear.setHours(0, 0, 0, 0);

  const endOfYear = new Date();
  endOfYear.setMonth(11, 31);
  endOfYear.setHours(23, 59, 59, 999);

  const monthlyTransactions = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfYear,
          $lte: endOfYear,
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
