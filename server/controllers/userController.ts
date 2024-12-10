import { Request, Response } from "express";
import bcrypt from "bcrypt";

import * as userService from "../services/userService";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body;

  try {
    const newUser = await userService.createUser(userData, res);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userWithoutPassword = await userService.loginUser(
      email,
      password,
      res
    );

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

  try {
    await userService.updateUser(userId, updatedData);

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

    await userService.editPassword(user._id.toString(), newPassword);

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
