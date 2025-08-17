import { z } from "zod";

export const createUserValidator = z.object({
  username: z.string(),
});

export type CreateTodo = z.infer<typeof createUserValidator>;
