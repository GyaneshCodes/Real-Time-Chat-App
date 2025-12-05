import express from "express";
import { logout, signIn, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/logout", logout);

export default authRouter;
