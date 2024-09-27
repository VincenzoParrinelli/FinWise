import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {} = req.body;

  console.log(req.body);

  //   try {
  //     const newUser: IUser = new User();
  //     newUser.save();
  //     res.status(201).json();
  //   } catch (err) {
  //     res.status(500).json({ message: (err as Error).message });
  //   }
};
