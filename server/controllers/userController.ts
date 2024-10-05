import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { isEmail, isDate, isStrongPassword, isMobilePhone } from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    res
      .status(201)
      .json({ User: newUser, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }

  console.log(req.body);
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

    const accessToken = jwt.sign(
      { id: userData._id },
      process.env.ACCESS_TOKEN_SECRET!
    );

    const refreshToken = jwt.sign(
      { id: userData._id },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // Exclude password from userData in response
    const { password: _, ...userWithoutPassword } = userData;

    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
