import { EventCreateData, EventUpdateData } from "@/constants/events";
import ConflictError from "@/errors/conflictError";
import UnauthorizedError from "@/errors/unauthorizedError";
import { eventsRepository } from "@/repositories";
import dayjs from "dayjs";

export async function createEvent({ title, start, end }: EventCreateData, userId: number) {
  const convertedStart = new Date(start);
  const convertedEnd = new Date(end);
  const currentDate = new Date();

  if (convertedStart.toUTCString() === convertedEnd.toUTCString()) {
    throw new ConflictError("Start and end date cannot be the same!");
  }

  if (dayjs(convertedEnd).isBefore(convertedStart, "hours")) {
    throw new ConflictError("Event cannot be in the past!");
  }

  if (dayjs(convertedEnd).isBefore(currentDate) || dayjs(convertedStart).isBefore(currentDate)) {
    throw new ConflictError("Event must be in the future!");
  }

  const isAvailable = await eventsRepository.checkEventAvailability(userId, convertedStart, convertedEnd);

  if (isAvailable.length !== 0) {
    throw new ConflictError("Event is already booked!");
  }

  await eventsRepository.createEvent(title, convertedStart, convertedEnd, userId);
}

export async function getEvents(userId: number) {
  return await eventsRepository.getEvents(userId);
}

export async function updateEvent(id: number, eventData: EventUpdateData, userId: number) {
  const eventInfo = await eventsRepository.getEventById(id);

  if (!eventInfo) throw new UnauthorizedError("Event does not exist");
  if (eventInfo.userId !== userId) throw new UnauthorizedError("You are not authorized to delete this event");

  if (eventData.start) {
    const convertedStart = new Date(eventData.start);
    const currentDate = new Date();
    const isAvailable = await eventsRepository.checkEventAvailability(
      userId,
      convertedStart,
      eventInfo.end,
      eventInfo.id,
    );
    if (isAvailable.length !== 0) {
      throw new ConflictError("You already have booked an event at this time!");
    }
    if (dayjs(eventInfo.end).isBefore(convertedStart, "hours")) {
      throw new ConflictError("Event cannot be in the past!");
    }
    if (dayjs(convertedStart).isBefore(currentDate)) {
      throw new ConflictError("Event must be in the future!");
    }
  }

  if (eventData.end) {
    const convertedEnd = new Date(eventData.end);
    const currentDate = new Date();
    const isAvailable = await eventsRepository.checkEventAvailability(
      userId,
      eventInfo.start,
      convertedEnd,
      eventInfo.id,
    );
    if (isAvailable.length !== 0) {
      throw new ConflictError("You already have booked an event at this time!");
    }
    if (dayjs(convertedEnd).isBefore(eventInfo.start, "hours")) {
      throw new ConflictError("Event cannot be in the past!");
    }
    if (dayjs(convertedEnd).isBefore(currentDate)) {
      throw new ConflictError("Event must be in the future!");
    }
  }

  await eventsRepository.updateEvent(id, eventData);
}

export async function deleteEvent(id: number, userId: number) {
  const eventInfo = await eventsRepository.getEventById(id);

  if (!eventInfo) throw new UnauthorizedError("Event does not exist");
  if (eventInfo.userId !== userId) throw new UnauthorizedError("You are not authorized to delete this event");

  await eventsRepository.deleteEvent(id);
}
