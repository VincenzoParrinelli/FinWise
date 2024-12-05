import Transaction from "../models/transactionModel";

export const getGroupedTransactions = async (
  group: string,
  userId: string
): Promise<any> => {
  switch (group) {
    case "Daily":
      return getDailyTransactions(userId);
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
