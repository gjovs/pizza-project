import Fastify from "fastify";
import cors from '@fastify/cors'

import homeRoutes from "./routes/home";

class App {
  constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();
    this.routes();  
  }

  middlewares() {
    this.server.register(cors, {
      origin: true,
    });
  }

  routes() {
    this.server.register(homeRoutes, { prefix: '/' });
  }
}

export default new App().server;
