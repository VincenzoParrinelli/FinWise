import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import { generateTokens } from "../utils/authUtils";

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
    if (accessToken) {
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
    }

    if (refreshToken) {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { id: string };

      const user = await User.findById(decodedRefresh.id).lean();

      if (!user) {
        res.status(403).json({ message: "User not found. Access denied." });

        return;
      }

      res.locals.user = user;

      generateTokens(user, res);

      return next();
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
    return;
  }
};
