import { describe, expect, test } from "vitest";
import { createUser } from "../../src/db/queries/users";
import { DBInputError } from "../../src/errors";

describe("Create User", () => {
  test("A user with valid username can be created", async () => {
    const newUser = await createUser({ username: "Elijah" });
    expect(newUser.username).toBe("Elijah");
  });
  test("A user with length < 3 cannot be created", async () => {
    await expect(createUser({ username: "El" })).rejects.toBeInstanceOf(
      DBInputError
    );
  });
  test("Duplicate users are handled appropriately", async () => {
    await createUser({ username: "Schmeli" });
    await expect(createUser({ username: "Schmeli" })).rejects.toBeInstanceOf(
      DBInputError
    );
  });
});
