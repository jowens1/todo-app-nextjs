import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';
import Card from '../components/card';
import Container from '../components/container';
import Layout from '../components/layout';
import Tile from '../components/tile';
import TodoForm from '../components/todoForm';
import TodoList from '../components/todoList';
import { TodoKeys } from '../types/Todo';
import { updateArray, removeItem } from '../utils/util';
import { Todo } from '@prisma/client';

const Todos = () => {
  const [init, setInit] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data: list, refetch } = trpc.useQuery(['todo.findAll']);
  const createTodo = trpc.useMutation(['todo.add'], {
    onSuccess: () => {
      refetch();
      console.log('create onSuccess');
    },
  });
  const deleteTodo = trpc.useMutation(['todo.delete'], {
    onSuccess: () => {
      refetch();
      console.log('delete onSuccess');
    },
  });

  useEffect(() => {
    if (init && list) {
      setInit(false);
      setTodos([...list]);
    }
  }, [list, init]);

  const handleCreate = (todo: Todo) => {
    createTodo.mutate({
      id: todo.id,
      action: todo.action,
      completed: todo.completed,
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
