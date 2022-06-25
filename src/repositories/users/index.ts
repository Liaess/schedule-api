import { prisma } from "@/config";
import { UserCreateData } from "@/constants/users";

export async function createUser(userData: UserCreateData) {
  return await prisma.user.create({
    data: userData,
  });
}

export async function checkUserExistanceByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
