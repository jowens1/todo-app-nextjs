import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
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

  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions));
  return {
    req,
    res,
    session,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () =>
  trpc.router<Context>().middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    result.ok
      ? console.log('OK request timing:', { path, type, durationMs })
      : console.log('Non-OK request timing', { path, type, durationMs });
    return result;
  });
// Todo explore more, currently breaks user experience
//  .middleware(({ ctx, next }) => {
//   console.log('middlewware ', ctx.session);
//   if (!ctx.session) {

//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }
//   return next({
//     ctx: {
//       ...ctx,
//       session: ctx.session,
//     },
//   });
// })
