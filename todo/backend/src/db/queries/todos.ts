import { db } from "..";
import { DBInputError, DBUnexpectedError } from "../../errors";
import { todoTable, type InsertTodo } from "../schema";
import { DrizzleQueryError, eq } from "drizzle-orm";
import type { DatabaseError as PostgresError } from "pg";

export async function createTodo(todoData: InsertTodo) {
  try {
    const [newTodo] = await db
      .insert(todoTable)
      .values({
        content: todoData.content,
        dueDate: todoData.dueDate,
        isCompleted: todoData.isCompleted,
        userId: todoData.userId,
      })
      .returning();

    return newTodo;
  } catch (err: unknown) {
    if (err instanceof DrizzleQueryError) {
      const cause = err.cause as PostgresError | undefined;
      if (cause) {
      }
    }

    throw new DBUnexpectedError("Something went wrong");
  }
}

export async function deleteTodo(todoId: number) {
  try {
    await db.delete(todoTable).where(eq(todoTable.id, todoId));
  } catch (err: unknown) {
    throw new DBUnexpectedError("Could not Delete Todo");
  }
}

export async function updateTodo(todoData: InsertTodo) {
  try {
    const updatedTodo = await db.update(todoTable).set({
      ...todoData,
    });

    return updatedTodo;
  } catch (err: unknown) {
    throw new DBUnexpectedError("Could not update todo");
  }
}

export async function getTodos() {
  const todos = await db.select().from(todoTable);
  return todos;
}
