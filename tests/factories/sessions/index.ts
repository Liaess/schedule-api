import { Session } from "@prisma/client";
import { prisma } from "@/config";

export async function createSession(userId: number, token: string): Promise<Session> {
  return await prisma.session.create({
    data: {
      userId,
      token,
    },
  });
}
