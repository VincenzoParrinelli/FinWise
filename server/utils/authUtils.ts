import { Response } from "express";
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";

export const generateTokens = (user: IUser, res: Response) => {
  const newAccessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: false,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
  });
};
