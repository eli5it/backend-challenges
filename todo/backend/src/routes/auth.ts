import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const usersRouter = Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
