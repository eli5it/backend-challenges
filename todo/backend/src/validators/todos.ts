import { z } from "zod";

export const createTodoValidator = z.object({
  content: z.string(),
  dueDate: z.coerce.date(),
  userId: z.number(),
  isCompleted: z.boolean().optional(),
});

export type CreateTodo = z.infer<typeof createTodoValidator>;
