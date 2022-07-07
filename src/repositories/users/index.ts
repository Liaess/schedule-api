import { prisma } from "@/config";
import { UserCreateData } from "@/constants/users";

export class UsersRepository {
  async createUser(userData: UserCreateData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async checkUserExistanceByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
