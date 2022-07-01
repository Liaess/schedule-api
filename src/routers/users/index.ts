import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { signUpSchema, signInSchema } from "@/schemas/users";
import { usersController } from "@/controllers";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export const usersRouter = Router();

usersRouter.post("/register", validateBody(signUpSchema), usersController.signUp);
usersRouter.post("/login", validateBody(signInSchema), usersController.signIn);
usersRouter.post("/logout", authenticateToken, usersController.logout);
