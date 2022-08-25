// import superjson from 'superjson'
import { createRouter } from './context';
import { todoRouter } from './todo';
import { userRouter } from './user';

export const appRouter = createRouter()
  .merge('todo.', todoRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
