import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserCreateData, UserLoginData } from "@/constants/users";
import { UsersService } from "@/services/users";

const userService = new UsersService();

export class UsersController {
  async signUp(req: Request, res: Response) {
    const userData: UserCreateData = req.body;
    await userService.createUser(userData);
    res.sendStatus(httpStatus.CREATED);
  }

  async signIn(req: Request, res: Response) {
    const userData: UserLoginData = req.body;
    const token = await userService.signIn(userData);
    res.status(httpStatus.OK).send(token);
  }

  async logout(_req: Request, res: Response) {
    const userId = res.locals.userId;
    const token = res.locals.token;
    await userService.logout(userId, token);
    res.sendStatus(httpStatus.OK);
  }
}
