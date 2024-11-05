import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { generateAccessToken } from "../utils/authUtils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    res.status(401).json({ message: "No tokens provided. Access denied." });
    return;
  }

  try {
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { id: string };

    const user = await User.findById(decodedAccess.id).lean();

    if (!user) {
      res.status(401).json({ message: "User not found. Access denied." });
      return;
    }

    res.locals.user = user;
    return next();
  } catch (accessErr) {
    if (accessErr instanceof jwt.TokenExpiredError && refreshToken) {
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token missing or expired" });
        return;
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as { id: string };

        const user = await User.findById(decodedRefresh.id).lean();

        if (!user) {
          res.status(401).json({ message: "User not found. Access denied." });
          return;
        }

        res.locals.user = user;

        generateAccessToken(user, res);

        return next();
      } catch (refreshErr) {
        res.status(403).json({ message: "Refresh token expired" });
        return;
      }
    }

    res.status(403).json({ message: "Access token invalid" });
    return;
  }
};
