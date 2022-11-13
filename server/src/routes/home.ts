import { FastifyInstance } from "fastify";
import { HomeController } from "../controllers/";

export default async function homeRoutes(server: FastifyInstance) {
    server.get('/teste', HomeController.index)
}