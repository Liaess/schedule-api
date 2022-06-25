import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export async function createUser() {
  const password = await bcrypt.hash(faker.internet.password(), 10);
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
