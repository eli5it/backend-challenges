"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const api = (0, supertest_1.default)(server_1.app);
(0, vitest_1.describe)("POST /users", () => {
    (0, vitest_1.test)("A valid user can be created, and a 201 response code is returned", async () => {
        const res = await api.post("/api/users").send({
            username: "Elijah",
        });
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body.username).toBe("Elijah");
    });
    (0, vitest_1.test)("Attempting to create a duplicate user gives a helpful message", async () => {
        // First creation
        const firstResponse = await api.post("/api/users").send({
            username: "Elijah",
        });
        (0, vitest_1.expect)(firstResponse.status).toBe(201);
        // Attempt duplicate creation
        const res = await api.post("/api/users").send({
            username: "Elijah",
        });
        (0, vitest_1.expect)(res.status).toBe(400);
        (0, vitest_1.expect)(res.body.message).toBe("User with username Elijah already exists in the database.");
    });
    (0, vitest_1.test)("Users with invalid username lengths cannot be created", async () => {
        const res1 = await api.post("/api/users").send({
            username: "El",
        });
        const res2 = await api.post("/api/users").send({
            username: "Elfdafdafdafdsafdafdsafdafdsf",
        });
        (0, vitest_1.expect)(res1.status).toBe(400);
        (0, vitest_1.expect)(res2.status).toBe(400);
    });
});
