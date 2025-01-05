import { Request, Response, NextFunction } from "express";

import * as savingService from "../services/savingService";

import { HttpError } from "../utils/httpError";

export const getSavings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user._id.toString();
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const savings = await savingService.getSavings(userId, page, pageSize);

    res.status(200).json(savings);
  } catch (err) {
    next(err);
  }
};

export const getRandomSaving = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user._id.toString();

  try {
    const randomSaving = await savingService.getRandomSaving(userId);

    res.status(200).json(randomSaving);
  } catch (err) {
    next(err);
  }
};

export const createSaving = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const saving = req.body;
  const date = new Date(req.body.date);
  const userId = res.locals.user._id.toString();

  try {
    if (!(date instanceof Date) || isNaN(date.getTime()))
      throw new HttpError("Invalid Data", 400);

    const newSaving = savingService.createSaving(saving, userId);

    res.status(201).json(newSaving);
  } catch (err) {
    next(err);
  }
};

export const editSaving = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { updatedSaving, id } = req.body;

  try {
    await savingService.editSaving(id, updatedSaving);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const deleteSaving = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const savingId = req.params.id.toString();

  try {
    await savingService.deleteSaving(savingId);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
