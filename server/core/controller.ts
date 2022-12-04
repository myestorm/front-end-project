import prisma from '../core/prisma';
import { MD5 } from 'crypto-js';

export default class Controller {
  prisma = prisma;

  md5 (str: string) {
    return MD5(str).toString();
  }
};
