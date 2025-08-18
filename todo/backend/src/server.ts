import express from "express";
import usersRouter from "../src/routes/users";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use(errorHandler);
