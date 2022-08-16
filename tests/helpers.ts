import { prisma } from "@/config";
import { User } from "@prisma/client";
import { createSession, createUser } from "./factories";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { App } from "@/config";

export async function initServer() {
  const app = await new App().init();
  return supertest(app);
}

export async function cleanDB() {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE sessions RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE events RESTART IDENTITY CASCADE;`;
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ id: incomingUser.id }, process.env.JWT_SECRET as string);
  await createSession(Number(incomingUser.id), token);
  return token;
}
