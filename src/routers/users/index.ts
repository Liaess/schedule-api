import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { signUpSchema, signInSchema } from "@/schemas/users";
import * as usersController from "@/controllers";

export const usersRouter = Router();

usersRouter.post("/sign-up", validateBody(signUpSchema), usersController.createUser);
usersRouter.post("/sign-in", validateBody(signInSchema), usersController.signIn);
