import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { signUpSchema, signInSchema } from "@/schemas/users";
import * as usersController from "@/controllers";

export const usersRouter = Router();

usersRouter.post("/register", validateBody(signUpSchema), usersController.signUp);
usersRouter.post("/login", validateBody(signInSchema), usersController.signIn);
