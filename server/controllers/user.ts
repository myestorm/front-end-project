import Controller from '../core/controller';

import type { IUserCreateType, IUserUpdateType } from '@t/user';

export default class UserController extends Controller {
  async create (userInfo: IUserCreateType) {
    try {
      const prisma = this.prisma;
      const result = await prisma.user.create({
        data: {
          ...userInfo
        },
      });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async delete (id: number) {
    const prisma = this.prisma;
    const user = await prisma.user.delete({
      where: { id }
    });
    return user;
  }
  
  async update (id: number, userInfo: IUserUpdateType) {
    const prisma = this.prisma;
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...userInfo
      },
    });
    return user;
  }

  async findAll () {
    const prisma = this.prisma;
    const result = await prisma.user.findMany();
    return result;
  }
};
