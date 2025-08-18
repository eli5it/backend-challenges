import { db } from "..";
import { DBUnexpectedError } from "../../errors";
import { type InsertUser } from "../schema";
import { userTable } from "../schema";

export async function createUser(userData: InsertUser) {
  try {
    const [newUser] = await db
      .insert(userTable)
      .values({
        username: userData.username,
      })
      .returning();

    return newUser;
  } catch (err: unknown) {
    console.log(err);
    throw new DBUnexpectedError("Something went wrong");
  }
}

export async function deleteUsers() {
  return await db.delete(userTable);
}
