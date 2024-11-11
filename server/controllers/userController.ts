import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { isEmail, isDate, isStrongPassword, isMobilePhone } from "validator";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body;
  const { email, password, phone, dateOfBirth } = req.body;

  try {
    if (
      !isEmail(email) ||
      !isStrongPassword(password) ||
      !isMobilePhone(phone) ||
      !isDate(dateOfBirth, { format: "DD/MM/YYYY" })
    ) {
      res.status(400).json({ message: "Invalid Data" });
      return;
    }

    const userAlreadyExistent = await User.findOne({ email }).lean();

    if (userAlreadyExistent) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({ ...userData, password: hashedPassword });
    newUser.save();

    generateAccessToken(userData, res);
    generateRefreshToken(userData, res);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email }).lean();

    if (!userData) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    if (!(await bcrypt.compare(password, userData.password))) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    generateAccessToken(userData, res);
    generateRefreshToken(userData, res);

    // Exclude password from userData in response
    const { password: _, ...userWithoutPassword } = userData;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedData = req.body;
  const userId = res.locals.user._id.toString();

  if (!updatedData || Object.keys(updatedData).length === 0) {
    res.status(400).send({ message: "No updated Data" });
    return;
  }

  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] === "") delete updatedData[key];
  });

  try {
    await User.updateOne({ _id: userId }, { $set: updatedData });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const editPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = res.locals.user;
  const { currPassword, newPassword } = req.body;

  try {
    if (!(await bcrypt.compare(currPassword, user.password))) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { _id: user._id.toString() },
      { $set: { password: newHashedPassword } }
    );

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.end();
};
