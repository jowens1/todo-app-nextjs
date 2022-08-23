import { createRouter } from './context';
import { z } from 'zod';

export const todoRouter = createRouter()
  .query('findAll', {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.todo.findMany();
    },
  })
  .mutation('add', {
    input: z.object({
      id: z.string(),
      action: z.string(),
      completed: z.boolean(),
      authorId: z.string().nullable().optional(),
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

//  data: {
//         action: input.action,
//         completed: input.completed,
//         id: input.id,
//       },
