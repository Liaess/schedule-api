import { prisma } from "@/config";
import { EventUpdateData } from "@/constants/events";

export class EventsRepository {
  async checkEventAvailability(userId: number, convertedStart: Date, convertedEnd: Date, id?: number) {
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

  async createEvent(title: string, convertedStart: Date, convertedEnd: Date, userId: number) {
    await prisma.event.create({
      data: {
        title,
        start: convertedStart,
        end: convertedEnd,
        userId,
      },
    });
  }

  async getEvents(userId: number) {
    return await prisma.event.findMany({
      where: {
        userId,
      },
    });
  }

  async getEventById(id: number) {
    return await prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteEvent(id: number) {
    await prisma.event.delete({
      where: {
        id,
      },
    });
  }

  async updateEvent(id: number, eventData: EventUpdateData) {
    await prisma.event.update({
      where: {
        id,
      },
      data: eventData,
    });
  }
}
