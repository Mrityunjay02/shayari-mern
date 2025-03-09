import { Router } from "express";
import { loginUser, register } from "../controller/auth.controller.js";

const authRouter = Router();

// Authentication routes
authRouter.post("/login", loginUser);
authRouter.post("/register", register);

export default authRouter;
