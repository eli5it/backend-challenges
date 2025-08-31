import { describe, expect, test } from "vitest";
import { createUser } from "../../src/db/queries/users";
import { DBInputError } from "../../src/errors";

describe("Create User", () => {
  test("A user with valid username can be created", async () => {
    const newUser = await createUser({ username: "Elijah" });
    expect(newUser.username).toBe("Elijah");
  });
  test("A user with length < 3 cannot be created", async () => {
    await expect(async () => {
      await createUser({ username: "El" });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Username length must be between 4 and 20 characters",
        name: "DBInputError",
      })
    );
  });
  test("Duplicate users are handled appropriately", async () => {
    // First creation should succeed
    const firstUser = await createUser({ username: "Schmeli" });
    expect(firstUser.username).toBe("Schmeli");

    // Second creation should fail with specific error
    await expect(async () => {
      await createUser({ username: "Schmeli" });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User with username Schmeli already exists in the database.",
        name: "DBInputError",
      })
    );
  });
});
