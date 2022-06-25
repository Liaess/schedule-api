import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function createUser(params?: string): Promise<Omit<User, "id">> {
  const incomingPassword: string = params || faker.internet.password(6);
  const password = await bcrypt.hash(incomingPassword, 12);

  const data = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
  };

  await prisma.user.create({
    data,
  });

  return data;
}
