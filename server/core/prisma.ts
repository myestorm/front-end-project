import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$connect().catch((err) => console.error(err));

export default prisma;
