import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "../errors";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    console.log(err);
    res.status(err.statusCode);
    return res.json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong. Please try again later.",
  });
}
