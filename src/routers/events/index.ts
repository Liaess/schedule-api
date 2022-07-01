import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { eventsController } from "@/controllers";
import { eventSchema } from "@/schemas/events";

export const eventsRouter = Router();

eventsRouter.post("/register", validateBody(eventSchema), eventsController.createEvent);
eventsRouter.get("/", eventsController.getEvents);
eventsRouter.put("/:id", eventsController.updateEvent);
eventsRouter.delete("/:id", eventsController.deleteEvent);
