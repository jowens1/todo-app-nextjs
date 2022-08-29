import { createRouter } from './context';
import { z } from 'zod';

export const todoRouter = createRouter()
  .query('findAll', {
    input: z.object({
      authorId: z.string().nullish(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          authorId: input.authorId ?? '',
        },
      });
    },
  })
  .mutation('add', {
    input: z.object({
      action: z.string(),
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
  })
  .mutation('complete', {
    input: z.object({
      id: z.string(),
      completed: z.boolean(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id, completed } = input;
      return await ctx.prisma.todo.update({
        where: { id },
        data: {
          completed: completed,
        },
      });
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string(),
      action: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id, action } = input;
      return await ctx.prisma.todo.update({
        where: { id },
        data: {
          action: action,
        },
      });
    },
  });

export type TodoRouter = typeof todoRouter;
