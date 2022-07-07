import "@/config";
import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "@/config";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import { routers } from "@/routers";

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
    this.server.use(routers).use(errorHandlingMiddleware);
  }

  public async init(): Promise<Express> {
    connectDB();
    return this.server;
  }

  public async close(): Promise<void> {
    await disconnectDB();
  }
}
