import Saving, { ISaving } from "../models/savingModel";
import Transaction from "../models/transactionModel";

import { HttpError } from "../utils/httpError";

export const getSavings = async (
  userId: string,
  page: number,
  pageSize: number
): Promise<{ totals: any; savings: ISaving[] }> => {
  const totals = await Saving.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalDocuments: { $sum: 1 },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  const savings = await Saving.find({ userId })
    .sort({ date: -1 })
    .skip((page - 1) * pageSize)
    .limit(10)
    .lean();

  return { savings, ...totals[0] };
};

export const getRandomSaving = async (
  userId: string
): Promise<ISaving[] | null> => {
  const randomSaving = await Saving.aggregate([
    { $match: { userId } },
    { $sample: { size: 1 } },
  ]);

  return randomSaving.length ? randomSaving[0] : null;
};

export const createSaving = async (
  saving: ISaving,
  userId: string
): Promise<ISaving> => {
  const newSaving: ISaving = new Saving({
    ...saving,
    userId,
  });

  await newSaving.save();
  return newSaving;
};

export const editSaving = async (
  id: string,
  updatedSaving: Partial<ISaving>
) => {
  await Saving.updateOne({ _id: id }, { $set: updatedSaving });
};

export const deleteSaving = async (savingId: string): Promise<void> => {
  const result = await Saving.deleteOne({ _id: savingId });

  if (!result.deletedCount) throw new HttpError("Saving not found", 401);

  await Transaction.deleteMany({ savingId });
};
