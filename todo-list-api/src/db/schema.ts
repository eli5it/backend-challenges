import { timeStamp } from "console";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const todoTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  content: varchar({ length: 255 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  userId: integer().references(() => userTable.id, {
    onDelete: "cascade",
  }),
  isCompleted: boolean().default(false).notNull(),
});

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  username: varchar({ length: 255 }).notNull(),
});
