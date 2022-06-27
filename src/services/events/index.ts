import { EventCreateData } from "@/constants/events";
import ConflictError from "@/errors/conflictError";
import { startOfHour, parseISO, isBefore } from "date-fns";
import * as eventsRepository from "@/repositories";

export async function createEvent({ title, description, startDate, endDate }: EventCreateData, userId: number) {
  const convertedStartDate = parseISO(startDate);
  const convertedEndDate = parseISO(endDate);
  const startHour = startOfHour(convertedStartDate);
  const endHour = startOfHour(convertedEndDate);

  if (convertedEndDate === convertedStartDate) {
    throw new ConflictError("End date must be greater than start date");
  }

  if (isBefore(convertedEndDate, convertedStartDate)) {
    throw new ConflictError("Start date must be before end date");
  }

  if (isBefore(startHour, new Date()) || isBefore(endHour, new Date())) {
    throw new ConflictError("Event must be in the future!");
  }

  const isAvailable = await eventsRepository.checkEventAvailability(userId, convertedStartDate, convertedEndDate);

  if (isAvailable.length !== 0) {
    throw new ConflictError("Event is already booked!");
  }

  await eventsRepository.createEvent(title, description, convertedStartDate, convertedEndDate, userId);
}
