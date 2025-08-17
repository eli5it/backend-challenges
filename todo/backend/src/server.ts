import express from "express";
import usersRouter from "../src/routes/users";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());

// Add a test route to verify server is working
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/users", usersRouter);
app.use(errorHandler);
