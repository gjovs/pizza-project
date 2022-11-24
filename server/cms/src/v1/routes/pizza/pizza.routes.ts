import { FastifyInstance } from "fastify";
import prisma from "../../configs/database";

export default async function pizzaRoutes(server: FastifyInstance) {
  server.get("/types", async (req, rep) => {

    const pizzas = await prisma.pizza.findMany();

    const product = await prisma.tbl_product.findUnique({
      where: {
        id: pizzas[0].product_id as number
      }
    })
  
    const productWithPizza = await prisma.tbl_product.findMany({
      include: {       
        pizza: {
          select: {
            pizza_stuffing: {
              select: {
                stuffing: true,
              }
            }
          }
        },
      },
    });


  

    console.log(productWithPizza);
    console.log(pizzas)   
    console.log(product);
    


    const response = await prisma.pizza_type.findMany({
      select: {
        name: true,
      },
    });

    return rep.send(response);
  });
}
