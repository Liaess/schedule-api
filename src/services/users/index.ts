import { UserCreateData, UserLoginData } from "@/constants/users";
import ConflictError from "@/errors/conflictError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UnauthorizedError from "@/errors/unauthorizedError";
import { SessionsRepository, UsersRepository } from "@/repositories";

const usersRepository = new UsersRepository();
const sessionsRepository = new SessionsRepository();

export class UsersService {
  async createUser(userData: UserCreateData) {
    const user = await usersRepository.checkUserExistanceByEmail(userData.email);

    if (user) {
      throw new ConflictError("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    userData.password = hashedPassword;
    delete userData.confirmPassword;

    await usersRepository.createUser(userData);
  }

  async signIn(userData: UserLoginData) {
    const user = await usersRepository.checkUserExistanceByEmail(userData.email);

    if (!user) {
      throw new UnauthorizedError("Do you have an account? Did you type all the correct data?");
    }

    const isValidPassword = await bcrypt.compare(userData.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError("Do you have an account? Did you type all the correct data?");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    await sessionsRepository.createSession(user.id, token);

    return { name: user.name, token };
  }

  async logout(userId: string, token: string) {
    await sessionsRepository.deleteSession(Number(userId), token);
  }
}
