import { db } from "..";
import { type InsertUser } from "../schema";
import { userTable } from "../schema";

export async function createUser(userData: InsertUser) {
  const newUser = await db
    .insert(userTable)
    .values({
      username: userData.username,
    })
    .returning();
  return newUser;
}
