import UnauthorizedError from "@/errors/unauthorizedError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authenticateToken(req: Request, res: Response, _next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) throw new UnauthorizedError("You must be logged in to continue!");

  const token = authHeader?.replace("Bearer ", "");
  if (!token) throw new UnauthorizedError("You must be logged in to continue!");

  try {
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    res.locals.userId = userId;
  } catch (error) {
    throw new UnauthorizedError("You must be logged in to continue!");
  }
  _next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  id: number;
};
