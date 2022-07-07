import "@/config";
import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { connectDB, disconnectDB } from "@/config";
import { usersRouter, eventsRouter } from "@/routers";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export class App {
  public server;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(json());
  }

  private routes() {
    this.server
      .use("/health", (_req, res) => res.sendStatus(httpStatus.OK))
      .use("/users", usersRouter)
      .use("/events", authenticateToken, eventsRouter)
      .use(errorHandlingMiddleware);
  }

  public async init(): Promise<Express> {
    connectDB();
    return this.server;
  }

  public async close(): Promise<void> {
    await disconnectDB();
  }
}
