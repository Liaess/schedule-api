import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { signUpSchema } from "@/schemas/users";
import * as usersController from "@/controllers";

export const usersRouter = Router();

usersRouter.post("/sign-up", validateBody(signUpSchema), usersController.createUser);
