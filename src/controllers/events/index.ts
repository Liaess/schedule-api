import { Request, Response } from "express";
import httpStatus from "http-status";
import { eventsService } from "@/services";
import { EventCreateData, EventUpdateData } from "@/constants/events";

export async function createEvent(req: Request, res: Response) {
  const eventData: EventCreateData = req.body;
  const userId = res.locals.userId;
  await eventsService.createEvent(eventData, userId);
  res.sendStatus(httpStatus.CREATED);
}

export async function getEvents(_req: Request, res: Response) {
  const userId = res.locals.userId;
  const events = await eventsService.getEvents(userId);
  res.status(httpStatus.OK).send(events);
}

export async function updateEvent(req: Request, res: Response) {
  const { id } = req.params;
  const eventData: EventUpdateData = req.body;
  const userId = res.locals.userId;
  await eventsService.updateEvent(Number(id), eventData, userId);
  // res.sendStatus(httpStatus.OK);
}

export async function deleteEvent(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;
  await eventsService.deleteEvent(Number(id), userId);
  res.sendStatus(httpStatus.OK);
}
