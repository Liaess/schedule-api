import { prisma } from "@/config";

export async function checkEventAvailability(userId: number, convertedStartDate: Date, convertedEndDate: Date) {
  return await prisma.event.findMany({
    where: {
      userId,
      AND: [
        {
          startDate: {
            gte: new Date(convertedStartDate),
          },
        },
        {
          endDate: {
            lte: new Date(convertedEndDate),
          },
        },
        {
          userId: {
            equals: userId,
          },
        },
      ],
    },
  });
}

export async function createEvent(
  title: string,
  description: string,
  convertedStartDate: Date,
  convertedEndDate: Date,
  userId: number,
) {
  await prisma.event.create({
    data: {
      title,
      description,
      startDate: convertedStartDate,
      endDate: convertedEndDate,
      userId,
    },
  });
}
