import { Request, Response } from "express";
import { createUserValidator } from "../validators/users";
import z from "zod";
import { BadRequestError, DBInputError } from "../errors";
import { createUser as createDbUser } from "../db/queries/users";
import bcrypt from "bcryptjs";

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password } = createUserValidator.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUserData = { username, passwordHash };
    const user = await createDbUser(newUserData);
    return res.status(201).json(user);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError("Please provide a valid username and password");
    }
    if (err instanceof DBInputError) {
      throw new BadRequestError(err.message);
    }
    throw err;
  }
}

export async function loginUser(req: Request, res: Response) {}
