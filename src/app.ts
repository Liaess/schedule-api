import "@/config";
import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { connectDB, disconnectDB } from "@/config";
import { usersRouter, eventsRouter } from "@/routers";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send(httpStatus.OK))
  .use("/users", usersRouter)
  .use("/events", authenticateToken, eventsRouter)
  .use(errorHandlingMiddleware);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
