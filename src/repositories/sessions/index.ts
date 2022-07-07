import { prisma } from "@/config";

export class SessionsRepository {
  async createSession(userId: number, token: string) {
    await prisma.session.create({
      data: {
        userId,
        token,
      },
    });
  }

  async deleteSession(userId: number, token: string) {
    await prisma.session.deleteMany({
      where: {
        AND: [{ userId }, { token }],
      },
    });
  }
}
