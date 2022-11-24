import prisma from '../configs/database'

export interface IUser {
  id: number;
  profile_picture: unknown;
  name: string;
  email: string;
  phone: string;
  cellphone: string;
  password: string;
}

export class User {
  async save(data: IUser) {
    const { id } = await prisma.user.create({
      data: {
        name: data.name,
        cellphone: data.cellphone,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture as string,
        phone: data.phone,
        isAdmin: false
      }
    })

    return id;
  }
}