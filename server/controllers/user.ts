import jwt from 'jsonwebtoken';
import Controller from '../core/controller';
import { jwtSecret } from '../config/const'

import type { IUserCreateType, IUserUpdateType } from '@t/user';

export default class UserController extends Controller {
  async create (userInfo: IUserCreateType) {
    userInfo.password = this.md5(userInfo.password);
    const prisma = this.prisma;
    const result = await prisma.user.create({
      data: {
        ...userInfo
      },
    });
    return result;
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

  async signin (username: string, password: string): Promise<string> {
    const prisma = this.prisma;
    password = this.md5(password);
    const result = await prisma.user.findFirst({
      where: {
        username,
        password
      },
      select: {
        uuid: true,
        username: true,
        email: true,
        cellphone: true,
        nickname: true,
        avatar: true,
        status: true
      }
    });
    if (result?.uuid) {
      const payload = {
        uuid: result.uuid,
        username: result.username,
        cellphone: result.cellphone,
        email: result.email
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn:  '7d' });
      return token;
    } else {
      return '';
    }
  }
};
