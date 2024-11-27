import { Request, Response } from "express";
import Saving, { ISaving } from "../models/savingModel";
import Transaction from "../models/transactionModel";

export const getSavings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
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

    res.status(200).json({ savings, ...totals[0] });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createSaving = async (
  req: Request,
  res: Response
): Promise<void> => {
  const saving = req.body;
  const date = new Date(req.body.date);
  const userId = res.locals.user._id.toString();

  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const newSaving: ISaving = new Saving({
      ...saving,
      userId,
    });
    newSaving.save();

    res.status(201).json(newSaving);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const editSaving = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { updatedSaving, id } = req.body;

  try {
    await Saving.updateOne({ _id: id }, { $set: updatedSaving });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteSaving = async (
  req: Request,
  res: Response
): Promise<void> => {
  const savingId = req.params.id.toString();

  try {
    const result = await Saving.deleteOne({ _id: savingId });

    if (!result.deletedCount) {
      res.status(404).json({ message: "Saving not found" });
      return;
    }

    await Transaction.deleteMany({ savingId });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
