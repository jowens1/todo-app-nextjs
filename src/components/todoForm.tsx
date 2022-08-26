import Input from './input';
import Icon from './icon';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  submit: (action: string) => void;
};

const TodoForm = ({ submit }: Props) => {
  const todoInput = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const addTodo = () => {
    submit(todoInput?.current?.value || 'Press Edit Icon to update task!');
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
