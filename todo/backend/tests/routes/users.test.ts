import { describe, expect, test } from "vitest";
import { createUser } from "../../src/db/queries/users";
import { DBInputError } from "../../src/errors";
import request from "supertest";
import { app } from "../../src/server";

const api = request(app);

describe("POST /users", () => {
  test("A valid user can be created, and a 201 response code is returned", async () => {
    const res = await api.post("/api/users").send({
      username: "Elijah",
    });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe("Elijah");
  });
  test("Attempting to create a duplicate user gives a helpful message", async () => {
    await api.post("/api/users").send({
      username: "Elijah",
    });

    const res = await api.post("/api/users").send({
      username: "Elijah",
    });

    expect(res.status).toBe(400);
  });
});
