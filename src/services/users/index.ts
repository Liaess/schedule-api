import { sessionRepository, userRepository } from "@/repositories";
import { UserCreateData, UserLoginData } from "@/constants/users";
import ConflictError from "@/errors/conflictError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UnauthorizedError from "@/errors/unauthorizedError";

export async function createUser(userData: UserCreateData) {
  const user = await userRepository.checkUserExistanceByEmail(userData.email);

  if (user) {
    throw new ConflictError("User already exists!");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  userData.password = hashedPassword;
  delete userData.confirmPassword;

  await userRepository.createUser(userData);
}

export async function signIn(userData: UserLoginData) {
  const user = await userRepository.checkUserExistanceByEmail(userData.email);

  if (!user) {
    throw new UnauthorizedError("Do you have an account? Did you type all the correct data?");
  }

  const isValidPassword = await bcrypt.compare(userData.password, user.password);

  if (!isValidPassword) {
    throw new UnauthorizedError("Do you have an account? Did you type all the correct data?");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  await sessionRepository.createSession(user.id, token);

  return { name: user.name, token };
}

export async function logout(userId: string, token: string) {
  await sessionRepository.deleteSession(Number(userId), token);
}
