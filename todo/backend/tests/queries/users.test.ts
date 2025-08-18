import { describe, expect, test } from "vitest";
import { createUser } from "../../src/db/queries/users";

describe("Create User", () => {
  test("A user with valid username can be created", async () => {
    const newUser = await createUser({ username: "Elijah" });
    expect(newUser.username).toBe("Elijah");
  });
  //   test("A user with length < 3 cannot be created", async () => {
  //     const newUser = await createUser({ username: "El" });
  //     expect(newUser.username).toBe("El");
  //   });
});
