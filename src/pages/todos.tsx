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
import { Session } from 'next-auth';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '@/server/router';
import { createContext } from '@/server/router/context';

export enum TodoKeys {
  ID = 'id',
  ACTION = 'action',
  COMPLETED = 'completed',
}

type Props = {
  session: Session;
};

const Todos: NextPage<Props> = ({ session }: Props) => {
  const { data: list, refetch } = trpc.useQuery([
    'todo.findAll',
    {
      authorId: session?.user.id,
    },
  ]);

  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = trpc.useMutation(['todo.add'], {
    onSuccess: () => refetch(),
  });

  const deleteTodo = trpc.useMutation(['todo.delete']);

  const completeTodo = trpc.useMutation(['todo.complete'], {
    onSuccess: () => refetch(),
  });

  const editTodo = trpc.useMutation(['todo.edit'], {
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (list) {
      setTodos([...list]);
    }
  }, [list]);

  const handleCreate = useCallback(
    (action: string) => {
      createTodo.mutate({
        action: action,
        authorId: session?.user.id,
      });
      setTodos([
        ...todos,
        { id: '', action: action, completed: false, authorId: session.user.id },
      ]);
    },
    [todos, createTodo, session, setTodos]
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
    [todos, editTodo, setTodos]
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
    [todos, completeTodo, setTodos]
  );

  const handleDelete = useCallback(
    (todo: Todo) => {
      deleteTodo.mutate({ id: todo.id });
      setTodos([...removeItem(todos, todo)]);
    },
    [todos, deleteTodo, setTodos]
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
  return requireAuth(context, async (session: Session) => {
    const ssg = createSSGHelpers({
      router: appRouter,
      ctx: await createContext(),
    });
    await ssg.prefetchQuery('todo.findAll', {
      authorId: session?.user.id,
    });

    return {
      props: {
        trpcState: ssg.dehydrate(),
        session,
      },
    };
  });
}
