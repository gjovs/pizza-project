import cors from "cors";

import express, { Express } from "express";

import { pictureRoutes } from "./routes";

export default class Server {
  private static _instance: Server | null;

  declare server: Express;

  private constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes() {
    this.server.use("/photo", pictureRoutes);
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}

