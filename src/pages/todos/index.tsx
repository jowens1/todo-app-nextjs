import { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Tile from '../../components/tile';
import TodoForm from '../../components/todoForm';
import TodoList from '../../components/todoList';
import { updateArray, removeItem } from '../../utils/util';
import { Todo } from '@prisma/client';
import { requireAuth } from '@/components/requireAuth';
import { unstable_getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from '../api/auth/[...nextauth]';
// import { useSession } from 'next-auth/react';

export enum TodoKeys {
  ID = 'id',
  ACTION = 'action',
  COMPLETED = 'completed',
}

type Props = {
  authorId: string;
  todosList: Todo[];
};

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    nextAuthOptions
  );
  if (!session) return { props: {} };
  return { props: { authorId: session.user?.id } };
});

const Todos = ({ authorId }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data: list, refetch } = trpc.useQuery([
    'todo.findAll',
    { authorId: authorId },
  ]);

  const createTodo = trpc.useMutation(['todo.add'], {
    onSuccess: (data) => {
      refetch();
      console.log('create onSuccess', data);
    },
  });

  const deleteTodo = trpc.useMutation(['todo.delete'], {
    onSuccess: (data) => {
      refetch();
      console.log('delete onSuccess', data);
    },
  });

  useEffect(() => {
    if (list) {
      setTodos([...list]);
    }
  }, [list]);

  const handleCreate = (todo: Todo) => {
    createTodo.mutate({
      action: todo.action,
      completed: todo.completed,
      authorId: authorId,
    });
    if (todos) setTodos([...todos, todo]);
  };

  const handleEdit = (id: string, editedAction: string) =>
    setTodos(
      updateArray({
        array: todos || [],
        testKey: TodoKeys.ID,
        testValue: id,
        updateKey: TodoKeys.ACTION,
        updateValue: editedAction,
      })
    );

  const handleComplete = (id: string, isCompleted: boolean) =>
    setTodos(
      updateArray({
        array: todos,
        testKey: TodoKeys.ID,
        testValue: id,
        updateKey: TodoKeys.COMPLETED,
        updateValue: isCompleted,
      })
    );

  const handleCopy = (todo: Todo) => setTodos([...todos, todo]);

  const handleDelete = (todo: Todo) => {
    deleteTodo.mutate({ id: todo.id });
    setTodos([...removeItem(todos, todo)]);
  };

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
            copy={handleCopy}
            remove={handleDelete}
          />
        </Card>
      </Container>
    </Layout>
  );
};

export default Todos;
