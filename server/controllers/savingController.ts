import { Request, Response } from "express";
import Saving, { ISaving } from "../models/savingModel";

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
