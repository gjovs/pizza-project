import { user, tbl_product } from "@prisma/client";
import prisma from "../configs/database";

class User {
  async index(): Promise<user[]> {
    const res = await prisma.user.findMany();
    return res;
  }

  async show(id: number): Promise<user | null> {
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return res;
  }

  async save(data: user): Promise<number> {
    const { id } = await prisma.user.create({
      data: {
        name: data.name,
        cellphone: data.cellphone,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture as string,
        phone: data.phone,
        isAdmin: data.isAdmin,
      },
    });

    return id;
  }

  async update(newUser: user, id: number): Promise<user | null> {
    const res = await prisma.user.update({
      data: {
        name: newUser.name,
        email: newUser.email,
        profile_picture: newUser.profile_picture,
        password: newUser.password,
        cellphone: newUser.cellphone,
        phone: newUser.phone,
      },
      where: {
        id,
      },
    });

    return res;
  }

  async delete(id: number): Promise<boolean> {
    const res = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!res) return false;
    return true;
  }

  async getUserProducts(
    id: number
  ): Promise<tbl_product[] | boolean> {
    const res = await prisma.user.findUnique({
      select: {
        tbl_product: {
          where: {
            created_by: id
          }
        }
      },
      where: {
        id,
      },
    });

    const products = res?.tbl_product

    if (!products) return false;
    return products;
  }
}


export default new User()