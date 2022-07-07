import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { Router } from "express";
import httpStatus from "http-status";
import { eventsRouter } from "./events";
import { usersRouter } from "./users";

export const routers = Router();

routers.use("/health", (_req, res) => res.sendStatus(httpStatus.OK));
routers.use("/users", usersRouter);
routers.use("/events", authenticateToken, eventsRouter);
