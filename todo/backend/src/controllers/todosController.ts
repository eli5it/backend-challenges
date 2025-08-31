import { Request, Response } from "express";
import { createTodoValidator } from "../validators/todos";
import z from "zod";
import { BadRequestError, DBInputError } from "../errors";
import {
  createTodo as createDbTodo,
  deleteTodo as deleteDbTodo,
  updateTodo as updateDbTodo,
  getTodos as getDbTodos,
} from "../db/queries/todos";

export async function createTodo(req: Request, res: Response) {
  try {
    const newTodoData = createTodoValidator.parse(req.body);
    const todo = await createDbTodo(newTodoData);
    return res.status(201).json(todo);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.format();
      throw new BadRequestError(
        `Validation failed: ${JSON.stringify(errorMessages)}`
      );
    }
    if (err instanceof DBInputError) {
      throw new BadRequestError(err.message);
    }
    throw err;
  }
}

export async function updateTodo(req: Request, res: Response) {
  const todoId = parseInt(req.params.todoId);
  if (!isNaN(todoId)) {
    throw new BadRequestError("Invalid todo id provided");
  }

  try {
    const todoData = await createTodoValidator.parse(req.body);
    const updatedTodo = await updateDbTodo(todoData);
    return res.json(updatedTodo);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.format();
      throw new BadRequestError(
        `Validation failed: ${JSON.stringify(errorMessages)}`
      );
    }

    if (err instanceof DBInputError) {
      throw new BadRequestError(err.message);
    }
    throw err;
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const todoId = parseInt(req.params.todoId);
  if (isNaN(todoId)) {
    throw new BadRequestError("Invalid todo id provided");
  }

  try {
    await deleteDbTodo(todoId);
    return res.status(204).send();
  } catch (err) {
    throw new Error("something went wrong");
  }
}

export async function getTodos(req: Request, res: Response) {
  const todos = await getDbTodos();
  return res.json(todos);
}
