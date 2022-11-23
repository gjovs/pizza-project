import prisma from '../configs/database'

export default interface User {
  id: number;
  profile_picture: string;
  name: string;
  email: string;
  phone: string;
  cellphone: string;
  password: string;
  isAdmin: boolean;
}

export default class User {
  async save(data: User) {
    const { id } = await prisma.tbl_user.create({
      data: {
        name: data.name,
        cellphone: data.cellphone,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
        phone: data.phone,
        isAdmin: false
      }
    })

    return id;
  }
}