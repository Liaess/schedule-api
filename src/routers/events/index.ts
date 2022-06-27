import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import * as eventsController from "@/controllers";
import { eventSchema } from "@/schemas/events";

export const eventsRouter = Router();

eventsRouter.post("/register", validateBody(eventSchema), eventsController.createEvent);
