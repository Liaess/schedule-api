import { prisma } from "@/config";
import { EventUpdateData } from "@/constants/events";

export async function checkEventAvailability(userId: number, convertedStart: Date, convertedEnd: Date, id?: number) {
  return await prisma.event.findMany({
    where: {
      AND: [
        {
          start: {
            gte: new Date(convertedStart),
          },
        },
        {
          end: {
            lte: new Date(convertedEnd),
          },
        },
        {
          userId: {
            equals: userId,
          },
        },
      ],
      NOT: {
        id: id && id,
      },
    },
  });
}

export async function createEvent(title: string, convertedStart: Date, convertedEnd: Date, userId: number) {
  await prisma.event.create({
    data: {
      title,
      start: convertedStart,
      end: convertedEnd,
      userId,
    },
  });
}

export async function getEvents(userId: number) {
  return await prisma.event.findMany({
    where: {
      userId,
    },
  });
}

export async function getEventById(id: number) {
  return await prisma.event.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({
    where: {
      id,
    },
  });
}

export async function updateEvent(id: number, eventData: EventUpdateData) {
  await prisma.event.update({
    where: {
      id,
    },
    data: eventData,
  });
}
