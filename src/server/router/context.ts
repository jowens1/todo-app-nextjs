import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import {
  Session,
  unstable_getServerSession as getServerSession,
} from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions as nextAuthOptions } from '../../pages/api/auth/[...nextauth]';
import { prisma } from '../db/client';

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = await getSession(opts);
  return {
    req,
    res,
    session,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
