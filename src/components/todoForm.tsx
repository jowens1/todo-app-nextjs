import Input from './input';
import Icon from './icon';
import { useRef, useState } from 'react';

type Props = {
  submit: (action: string) => void;
};

const TodoForm = ({ submit }: Props) => {
  const [input, setInput] = useState('');
  const todoInput = useRef<HTMLInputElement>(null);
  const addTodo = () => {
    submit(todoInput?.current?.value || 'Press Edit Icon to update task!');
    setInput('');
  };
  const handleOnChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-64 items-center justify-between">
        <Input
          ref={todoInput}
          placeholder="Add new Todo"
          value={input}
          onChange={handleOnChange}
        />
        <Icon iconName="plus" onClick={addTodo} />
      </div>
    </div>
  );
};

export default TodoForm;
