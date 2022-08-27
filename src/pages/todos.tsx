import { GetServerSidePropsContext, NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { useCallback, useEffect, useState } from 'react';
import Card from '../components/card';
import Container from '../components/container';
import Layout from '../components/layout';
import Tile from '../components/tile';
import TodoForm from '../components/todoForm';
import TodoList from '../components/todoList';
import { updateArray, removeItem } from '../utils/util';
import { Todo } from '@prisma/client';
import { requireAuth } from '@/components/requireAuth';
import { getSession, useSession } from 'next-auth/react';
import { Session, unstable_getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from './api/auth/[...nextauth]';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '@/server/router';
import { createContext } from '@/server/router/context';
// import { useSession } from 'next-auth/react';

export enum TodoKeys {
  ID = 'id',
  ACTION = 'action',
  COMPLETED = 'completed',
}

type Props = {
  session: Session;
};

const Todos = ({ session }: Props) => {
  const { data: list, refetch } = trpc.useQuery([
    'todo.findAll',
    { authorId: session?.user?.id || '' },
  ]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = trpc.useMutation(['todo.add'], {
    // onSuccess: () => refetch(),
  });

  const deleteTodo = trpc.useMutation(['todo.delete'], {
    // onSuccess: () => refetch(),
  });

  const completeTodo = trpc.useMutation(['todo.complete'], {
    // onSuccess: () => refetch(),
  });

  const editTodo = trpc.useMutation(['todo.edit'], {
    // onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (list) {
      console.log('list', list);
      setTodos([...list]);
    }
  }, [list]);

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  const handleCreate = useCallback(
    (action: string) => {
      createTodo.mutate({
        action: action,
        authorId: session?.user?.id || '',
      });
    },
    [createTodo]
  );

  const handleEdit = useCallback(
    (id: string, editedAction: string) => {
      editTodo.mutate({ id, action: editedAction });
      setTodos(
        updateArray({
          array: todos,
          testKey: TodoKeys.ID,
          testValue: id,
          updateKey: TodoKeys.ACTION,
          updateValue: editedAction,
        })
      );
    },
    [editTodo]
  );

  const handleComplete = useCallback(
    (id: string, isCompleted: boolean) => {
      completeTodo.mutate({ id, completed: isCompleted });
      setTodos(
        updateArray({
          array: todos,
          testKey: TodoKeys.ID,
          testValue: id,
          updateKey: TodoKeys.COMPLETED,
          updateValue: isCompleted,
        })
      );
    },
    [todos, completeTodo]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo.mutate({ id: id });
      // setTodos([...removeItem(todos, todo)]);
    },
    [deleteTodo]
  );

  return (
    <Layout>
      <Container>
        <Card>
          <div className="flex w-full items-center">
            <Tile
              linkPath="/"
              imgPath="/home"
              type="icon"
              height={16}
              width={16}
            />
          </div>
          <TodoForm submit={handleCreate} />
        </Card>
        <Card>
          <TodoList
            todos={todos}
            complete={handleComplete}
            edit={handleEdit}
            remove={handleDelete}
          />
        </Card>
      </Container>
    </Layout>
  );
};

export default Todos;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  // return requireAuth(context, async (session: Session) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
  });

  await ssg.prefetchQuery('todo.findAll', {
    authorId: session?.user?.id || '',
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      session,
    },
  };
  // });
}
