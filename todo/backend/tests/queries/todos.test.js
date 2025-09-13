"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const errors_1 = require("../../src/errors");
const todos_1 = require("../../src/db/queries/todos");
const users_1 = require("../../src/db/queries/users");
(0, vitest_1.describe)("Create todo", () => {
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);
    (0, vitest_1.test)("A valid todo can be created succesfully", async () => {
        const newUser = await (0, users_1.createUser)({ username: "Elijah2" });
        const todoData = {
            userId: newUser.id,
            content: "Get groceries",
            dueDate: tommorow,
        };
        const newTodo = await (0, todos_1.createTodo)(todoData);
        (0, vitest_1.expect)(newTodo.content).toBe(todoData.content);
    });
    (0, vitest_1.test)("A todo with an invalid userId cannot be created", async () => {
        const todoData = {
            userId: 10000,
            content: "Get groceries",
            dueDate: tommorow,
        };
        await (0, vitest_1.expect)((0, todos_1.createTodo)(todoData)).rejects.toBeInstanceOf(errors_1.DBInputError);
    });
});
(0, vitest_1.describe)("Delete todo", () => {
    (0, vitest_1.test)("A todo can be deleted succesfully", async () => {
        const newUser = await (0, users_1.createUser)({
            username: "Elijah23",
        });
        const newTodo = await (0, todos_1.createTodo)({
            content: "Example",
            userId: newUser.id,
            dueDate: new Date(),
        });
        await (0, todos_1.deleteTodo)(newTodo.id);
        const allTodos = await (0, todos_1.getTodos)();
        const containsNewTodo = allTodos.some((todo) => todo.id === newTodo.id);
        (0, vitest_1.expect)(containsNewTodo).toBe(false);
    });
});
(0, vitest_1.describe)("Get Todos", () => {
    (0, vitest_1.test)("Get todos returns every todo in the db, sorted by due date", async () => {
        const today = new Date();
        const tommorow = new Date();
        const nextDay = new Date();
        tommorow.setDate(today.getDate() + 1);
        nextDay.setDate(tommorow.getDate() + 1);
        const newUser = await (0, users_1.createUser)({ username: "Schmeli2" });
        const todo1 = await (0, todos_1.createTodo)({
            content: "Todo 1",
            userId: newUser.id,
            dueDate: new Date(),
        });
        const todo2 = await (0, todos_1.createTodo)({
            content: "Todo 2",
            userId: newUser.id,
            dueDate: new Date(),
        });
        const todo3 = await (0, todos_1.createTodo)({
            content: "Todo 3",
            userId: newUser.id,
            dueDate: new Date(),
        });
        const allTodos = await (0, todos_1.getTodos)();
        (0, vitest_1.expect)(allTodos[0].content).toBe(todo1.content);
        (0, vitest_1.expect)(allTodos[1].content).toBe(todo2.content);
        (0, vitest_1.expect)(allTodos[2].content).toBe(todo3.content);
    });
});
