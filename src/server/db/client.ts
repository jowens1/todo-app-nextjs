import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server.mjs';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = prismaGlobal.prisma || new PrismaClient();

if (env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

// {log: ['query', 'info', 'error', 'warn'], }
