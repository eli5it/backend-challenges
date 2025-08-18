import { afterAll } from "vitest";
import { beforeAll, beforeEach } from "vitest";
import { db } from "../src/db";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

beforeAll(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
});

beforeEach(async () => {
  await db.execute(`TRUNCATE TABLE users, todos RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await db.$client.end();
});
