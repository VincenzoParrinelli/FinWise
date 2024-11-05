import { Response } from "express";
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: IUser, res: Response): void => {
  const newAccessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: false,
  });
};

export const generateRefreshToken = (user: IUser, res: Response): void => {
  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
  });
};
