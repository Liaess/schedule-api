import * as userRepository from "@/repositories";
import { UserCreateData } from "@/constants/users";
import ConflictError from "@/errors/conflictError";
import bcrypt from "bcrypt";

export async function createUser(userData: UserCreateData) {
  const user = await userRepository.checkUserExistanceByEmail(userData.email);

  if (user) {
    throw new ConflictError("User already exists");
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  userData.password = hashedPassword;
  delete userData.confirmPassword;

  await userRepository.createUser(userData);
}
