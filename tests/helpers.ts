import { prisma } from "@/config";

export async function cleanDB() {
  prisma.$executeRaw`TRUNCATE TABLE users CASCADE RESTART IDENTITY;`;
  prisma.$executeRaw`TRUNCATE TABLE sessions CASCADE RESTART IDENTITY;`;
}
