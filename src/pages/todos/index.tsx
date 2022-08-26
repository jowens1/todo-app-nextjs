import { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { useCallback, useEffect, useState } from 'react';
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

const Todos: NextPage<Props> = ({ authorId }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data: list, refetch } = trpc.useQuery([
    'todo.findAll',
    { authorId: authorId },
  ]);

  const createTodo = trpc.useMutation(['todo.add'], {
    onSuccess: () => refetch(),
  });

  const deleteTodo = trpc.useMutation(['todo.delete'], {
    onSuccess: () => refetch(),
  });

  const completeTodo = trpc.useMutation(['todo.complete'], {
    onSuccess: () => refetch(),
  });

  const editTodo = trpc.useMutation(['todo.edit'], {
    onSuccess: () => refetch(),
  });

  // useEffect(() => {
  //   if (list) {
  //     setTodos([...list]);
  //   }
  // }, [list]);

  useEffect(() => {
    console.log('todos', todos);
    console.log('list', list);
  }, [list]);

  const handleCreate = useCallback(
    (action: string) => {
      createTodo.mutate({
        action: action,
        authorId: authorId,
      });
    },
    [list, createTodo]
  );

  const handleEdit = useCallback(
    (id: string, editedAction: string) => {
      editTodo.mutate({ id, action: editedAction });
    },
    [list, editTodo]
  );

  const handleComplete = useCallback(
    (id: string, isCompleted: boolean) => {
      completeTodo.mutate({ id, completed: isCompleted });
      // setTodos(
      //   updateArray({
      //     array: todos,
      //     testKey: TodoKeys.ID,
      //     testValue: id,
      //     updateKey: TodoKeys.COMPLETED,
      //     updateValue: isCompleted,
      //   })
      // );
    },
    [todos, completeTodo]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo.mutate({ id: id });
      // setTodos([...removeItem(todos, todo)]);
    },
    [list, deleteTodo]
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
            todos={list ?? []}
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
