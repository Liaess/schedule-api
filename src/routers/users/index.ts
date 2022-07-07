import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { signUpSchema, signInSchema } from "@/schemas/users";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { UsersController } from "@/controllers";

export const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/register", validateBody(signUpSchema), usersController.signUp);
usersRouter.post("/login", validateBody(signInSchema), usersController.signIn);
usersRouter.post("/logout", authenticateToken, usersController.logout);
