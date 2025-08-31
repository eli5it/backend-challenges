import { describe, expect, test } from "vitest";
import request from "supertest";
import { app } from "../../src/server";

const api = request(app);

describe("POST /todos", () => {
  test("A valid todo can be created successfully", async () => {
    // Create user through API to ensure proper transaction handling
    const userRes = await api.post("/api/users").send({
      username: "Elijah2",
    });
    expect(userRes.status).toBe(201);
    const user = userRes.body;
    expect(user.id).toBeDefined();
    expect(user.username).toBe("Elijah2");

    const dueDate = new Date();
    const newTodo = {
      content: "Do stuff",
      dueDate: dueDate.toISOString(), // Convert to ISO string for API
      userId: user.id,
      isCompleted: false,
    };

    const res = await api.post("/api/todos").send(newTodo);

    expect(res.status).toBe(201);
    expect(res.body.content).toBe("Do stuff");
    expect(res.body.userId).toBe(user.id);
    expect(new Date(res.body.dueDate)).toEqual(dueDate);
  });
});

describe("DELETE /:todoId", () => {
  test("Deletion of todos works properly", async () => {
    // Create a user first through the API to ensure proper setup
    const userResponse = await api.post("/api/users").send({
      username: "Elijah234",
    });
    expect(userResponse.status).toBe(201);
    const userId = userResponse.body.id;

    // Create todo through API
    const todoResponse = await api.post("/api/todos").send({
      content: "Do stuff",
      dueDate: new Date().toISOString(),
      userId: userId,
      isCompleted: false,
    });
    expect(todoResponse.status).toBe(201);

    // Delete the todo
    const res = await api.delete(`/api/todos/${todoResponse.body.id}`);
    expect(res.status).toBe(204);
  });
});
