import { Request, Response } from "express";
import { createUserValidator } from "../validators/users";
import z from "zod";
import { BadRequestError, DBInputError } from "../errors";
import { createUser as createDbUser } from "../db/queries/users";

export async function createUser(req: Request, res: Response) {
  try {
    const newUserData = createUserValidator.parse(req.body);
    const user = await createDbUser(newUserData);
    return res.status(201).json(user);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError("Please provide a username");
    }
    if (err instanceof DBInputError) {
      throw new BadRequestError(err.message);
    }
    throw err;
  }
}

export async function loginuser(req: Request, res: Response) {}
