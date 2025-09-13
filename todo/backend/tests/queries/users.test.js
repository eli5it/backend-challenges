"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const users_1 = require("../../src/db/queries/users");
(0, vitest_1.describe)("Create User", () => {
    (0, vitest_1.test)("A user with valid username can be created", async () => {
        const newUser = await (0, users_1.createUser)({ username: "Elijah" });
        (0, vitest_1.expect)(newUser.username).toBe("Elijah");
    });
    (0, vitest_1.test)("A user with length < 3 cannot be created", async () => {
        await (0, vitest_1.expect)(async () => {
            await (0, users_1.createUser)({ username: "El" });
        }).rejects.toEqual(vitest_1.expect.objectContaining({
            message: "Username length must be between 4 and 20 characters",
            name: "DBInputError",
        }));
    });
    (0, vitest_1.test)("Duplicate users are handled appropriately", async () => {
        // First creation should succeed
        const firstUser = await (0, users_1.createUser)({ username: "Schmeli" });
        (0, vitest_1.expect)(firstUser.username).toBe("Schmeli");
        // Second creation should fail with specific error
        await (0, vitest_1.expect)(async () => {
            await (0, users_1.createUser)({ username: "Schmeli" });
        }).rejects.toEqual(vitest_1.expect.objectContaining({
            message: "User with username Schmeli already exists in the database.",
            name: "DBInputError",
        }));
    });
});
