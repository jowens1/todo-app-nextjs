import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions as nextAuthOptions } from '../pages/api/auth/[...nextauth]';

export async function requireAuth(ctx: GetServerSidePropsContext, cb: any) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return cb({ session });
}
