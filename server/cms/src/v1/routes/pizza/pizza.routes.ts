import { FastifyInstance } from "fastify";
import prisma from "../../configs/database";

export default async function pizzaRoutes(server: FastifyInstance) {
  server.get("/types", async (req, rep) => {
    
    // @ts-ignore
    const response = await prisma.pizza_type.findMany({
      select: {
        name: true,
      },
    });

    return rep.send(response);
  });
}
