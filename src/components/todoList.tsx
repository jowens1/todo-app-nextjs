import { Todo } from '@prisma/client';
import { NextPage } from 'next';
import TodoItem from './todoItem';

type Props = {
  todos: Todo[];
  complete: (id: string, isCompleted: boolean) => void;
  edit: (id: string, editedAction: string) => void;
  remove: (todo: Todo) => void;
};

const TodoList: NextPage<Props> = ({
  todos,
  complete,
  edit,
  remove,
}: Props) => {
  const renderList = () =>
    todos.map((todo, index) => (
      <li key={index} className="mb-2">
        <TodoItem
          todo={todo}
          id={index}
          complete={complete}
          edit={edit}
          remove={remove}
        />
      </li>
    ));

  return (
    <div className="min-w-full">
      <ul>{renderList()}</ul>
    </div>
  );
};

export default TodoList;
