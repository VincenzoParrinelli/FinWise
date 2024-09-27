import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { isEmail, isDate, isStrongPassword, isMobilePhone } from "validator";
import bcrypt from "bcrypt";

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
    }

    const userAlreadyExistent = await User.findOne({ email }).lean();

    if (userAlreadyExistent) {
      res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({ ...userData, password: hashedPassword });
    newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }

  console.log(req.body);
};
