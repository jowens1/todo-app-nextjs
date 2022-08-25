import Input from './input';
import { useRef } from 'react';
import { Todo } from '@prisma/client';
import Icon from './icon';
import { useSession } from 'next-auth/react';

type Props = {
  submit: (todo: Todo) => void;
};

const TodoForm = ({ submit }: Props) => {
  const todoInput = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const addTodo = () => {
    submit({
      id: '',
      action: todoInput?.current?.value || 'Press Edit Icon to update task!',
      completed: false,
      authorId: session?.user?.id || null,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-1">{'Create New Todo'}</h1>
      <div className="flex h-[34px] w-64 items-center justify-between">
        <Input ref={todoInput} placeholder="Add new Todo" />
        <Icon iconName="plus" onClick={addTodo} />
      </div>
    </div>
  );
};

export default TodoForm;
