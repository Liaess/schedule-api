import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export function generateValidEventBody(startDate?: Date, endDate?: Date) {
  const start = startDate || dayjs().add(2, "day").toDate();
  const end = endDate || dayjs().add(4, "day").toDate();

  return {
    title: faker.lorem.sentence(),
    start,
    end,
  };
}

export async function populateEvents(count: number, id: number) {
  const events = [];
  for (let i = 0; i < count; i++) {
    const event = generateValidEventBody();
    events.push({
      ...event,
      userId: id,
    });
  }
  await prisma.event.createMany({
    data: events,
  });
  return events;
}
