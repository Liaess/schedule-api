import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserCreateData, UserLoginData } from "@/constants/users";
import * as userService from "@/services";

export async function createUser(req: Request, res: Response) {
  const userData: UserCreateData = req.body;
  await userService.createUser(userData);
  res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response) {
  const userData: UserLoginData = req.body;
  const token = await userService.signIn(userData);
  res.status(httpStatus.OK).send(token);
}
