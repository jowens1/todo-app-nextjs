import { useState } from 'react';
import Card from '../components/card';
import Container from '../components/container';
import Layout from '../components/layout';
import TodoForm from '../components/todoForm';
import TodoList from '../components/todoList';
import Todo, { genericTodo, TodoKeys } from '../types/Todo';
import { updateArray, removeItem } from '../utils/util';

const Todos = () => {
  const [todos, setTodos] = useState([genericTodo]);

  const handleCreate = (todo: Todo) => setTodos([...todos, todo]);

  const handleEdit = (id: string, editedAction: string) =>
    setTodos(
      updateArray({
        array: todos,
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

  const handleDelete = (todo: Todo) => setTodos([...removeItem(todos, todo)]);

  return (
    <Layout>
      <Container>
        <Card>
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
