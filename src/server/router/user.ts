import { createRouter } from './context';
import { z } from 'zod';

export const userRouter = createRouter().query('getTodos', {
  resolve: async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      include: {
        todos: true,
      },
    });
  },
});

export type userRouter = typeof userRouter;
