import { Request, Response } from "express";
import httpStatus from "http-status";
import * as eventsService from "@/services";
import { EventCreateData } from "@/constants/events";

export async function createEvent(req: Request, res: Response) {
  const eventData: EventCreateData = req.body;
  const userId = res.locals.userId;
  await eventsService.createEvent(eventData, userId);
  res.sendStatus(httpStatus.CREATED);
}
