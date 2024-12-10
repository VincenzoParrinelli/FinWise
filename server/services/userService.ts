import { Response } from "express";
import { isEmail, isDate, isStrongPassword, isMobilePhone } from "validator";
import bcrypt from "bcrypt";

import User, { IUser } from "../models/userModel";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";

export const createUser = async (
  userData: any,
  res: Response
): Promise<IUser> => {
  const { email, password, phone, dateOfBirth } = userData;

  if (
    !isEmail(email) ||
    !isStrongPassword(password) ||
    !isMobilePhone(phone) ||
    !isDate(dateOfBirth, { format: "DD/MM/YYYY" })
  ) {
    const error = new Error("Invalid Data");
    (error as any).status = 400;
    throw error;
  }

  const userAlreadyExistent = await User.findOne({ email }).lean();

  if (userAlreadyExistent) {
    const error = new Error("User already exists");
    (error as any).status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: IUser = new User({ ...userData, password: hashedPassword });
  await newUser.save();

  generateAccessToken(userData, res);
  generateRefreshToken(userData, res);

  return newUser;
};

export const loginUser = async (
  email: string,
  password: string,
  res: Response
): Promise<Omit<IUser, "password">> => {
  const userData = await User.findOne({ email }).lean();

  if (!userData) {
    const error = new Error("User not found");
    (error as any).status = 404;
    throw error;
  }

  if (!(await bcrypt.compare(password, userData.password))) {
    const error = new Error("Invalid password");
    (error as any).status = 401;
    throw error;
  }

  generateAccessToken(userData, res);
  generateRefreshToken(userData, res);

  // Exclude password from userData in response
  const { password: _, ...userWithoutPassword } = userData;
  return userWithoutPassword;
};

export const updateUser = async (
  userId: string,
  updatedData: any
): Promise<void> => {
  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] === "") delete updatedData[key];
  });

  await User.updateOne({ _id: userId }, { $set: updatedData });
};

export const editPassword = async (
  userId: string,
  newPassword: string
): Promise<void> => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await User.updateOne(
    { _id: userId },
    { $set: { password: newHashedPassword } }
  );
};
