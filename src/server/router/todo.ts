import { createRouter } from './context';
import { z } from 'zod';

export const todoRouter = createRouter()
  .query('findAll', {
    input: z.object({
      authorId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          authorId: input.authorId,
        },
      });
    },
  })
  .mutation('add', {
    input: z.object({
      action: z.string(),
      completed: z.boolean(),
      authorId: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: input,
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.todo.delete({
        where: { id },
      });
    },
  });

export type TodoRouter = typeof todoRouter;
