import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';

import { authOptions as nextAuthOptions } from '../pages/api/auth/[...nextauth]';

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );
    console.log('required Auth ', session);
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return await func(ctx);
  };
