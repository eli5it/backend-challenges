import express from "express";
import usersRouter from "./routes/users";
import todosRouter from "./routes/todos";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

export const app = express();

// serve react frontend
const frontendPath = path.join(__dirname, "..", "public");
app.use(express.static(frontendPath));

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

// client-side handling of unknown routes
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

console.log(path.join(frontendPath, "index.html"));

app.use(errorHandler);
