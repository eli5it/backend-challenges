import express from "express";
import usersRouter from "../src/routes/users";
import todosRouter from "./routes/todos";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

app.use(errorHandler);
