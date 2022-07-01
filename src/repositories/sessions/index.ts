import { prisma } from "@/config";

export async function createSession(userId: number, token: string) {
  await prisma.session.create({
    data: {
      userId,
      token,
    },
  });
}

export async function deleteSession(userId: number, token: string) {
  await prisma.session.deleteMany({
    where: {
      AND: [{ userId }, { token }],
    },
  });
}
