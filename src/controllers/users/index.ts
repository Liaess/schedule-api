import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserCreateData } from "@/constants/users";
import * as userService from "@/services";

export async function createUser(req: Request, res: Response) {
  const userData: UserCreateData = req.body;
  await userService.createUser(userData);
  res.sendStatus(httpStatus.CREATED);
}
