import { NextFunction, Request, Response } from "express";

// Needs args: (err, req, res, next) otherwise
// express won’t recognize it as an error-handling middleware
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ error: message });
};
