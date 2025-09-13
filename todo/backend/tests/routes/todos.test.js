"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const api = (0, supertest_1.default)(server_1.app);
(0, vitest_1.describe)("POST /todos", () => {
    (0, vitest_1.test)("A valid todo can be created successfully", async () => {
        // Create user through API to ensure proper transaction handling
        const userRes = await api.post("/api/users").send({
            username: "Elijah2",
        });
        (0, vitest_1.expect)(userRes.status).toBe(201);
        const user = userRes.body;
        (0, vitest_1.expect)(user.id).toBeDefined();
        (0, vitest_1.expect)(user.username).toBe("Elijah2");
        const dueDate = new Date();
        const newTodo = {
            content: "Do stuff",
            dueDate: dueDate.toISOString(), // Convert to ISO string for API
            userId: user.id,
            isCompleted: false,
        };
        const res = await api.post("/api/todos").send(newTodo);
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body.content).toBe("Do stuff");
        (0, vitest_1.expect)(res.body.userId).toBe(user.id);
        (0, vitest_1.expect)(new Date(res.body.dueDate)).toEqual(dueDate);
    });
});
(0, vitest_1.describe)("DELETE /:todoId", () => {
    (0, vitest_1.test)("Deletion of todos works properly", async () => {
        // Create a user first through the API to ensure proper setup
        const userResponse = await api.post("/api/users").send({
            username: "Elijah234",
        });
        (0, vitest_1.expect)(userResponse.status).toBe(201);
        const userId = userResponse.body.id;
        // Create todo through API
        const todoResponse = await api.post("/api/todos").send({
            content: "Do stuff",
            dueDate: new Date().toISOString(),
            userId: userId,
            isCompleted: false,
        });
        (0, vitest_1.expect)(todoResponse.status).toBe(201);
        // Delete the todo
        const res = await api.delete(`/api/todos/${todoResponse.body.id}`);
        (0, vitest_1.expect)(res.status).toBe(204);
    });
});
