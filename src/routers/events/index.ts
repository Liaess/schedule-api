import { Router } from "express";
import { validateBody } from "@/middlewares/validationMiddleware";
import { eventSchema } from "@/schemas/events";
import { EventsController } from "@/controllers";

export const eventsRouter = Router();

const eventsController = new EventsController();

eventsRouter.post("/register", validateBody(eventSchema), eventsController.createEvent);
eventsRouter.get("/", eventsController.getEvents);
eventsRouter.put("/:id", eventsController.updateEvent);
eventsRouter.delete("/:id", eventsController.deleteEvent);
