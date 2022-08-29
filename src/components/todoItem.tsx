import { Todo } from '@prisma/client';
import Checkbox from './checkbox';
import { useEffect, useRef, useState } from 'react';
import { classNames } from '../utils/util';
import Icon from './icon';
import Input from './input';
import { useSession } from 'next-auth/react';

type Props = {
  todo: Todo;
  id: number;
  complete: (id: string, isCompleted: boolean) => void;
  edit: (id: string, editedAction: string) => void;
  remove: (todo: Todo) => void;
};

const cssOptions = {
  base: 'flex max-h-12 justify-between min-w-full',
  label: 'flex max-w-md overflow-auto items-center ml-4',
  completed: 'line-through',
};

const TodoItem = ({ todo, id, complete, edit, remove }: Props) => {
  const [input, setInput] = useState('');
  const editInput = useRef<HTMLInputElement>(null);
  const [isChecked, setChecked] = useState(todo.completed);
  const [isEditing, setEditing] = useState(false);

  const handleComplete = () => {
    setChecked(!isChecked);
    complete(todo.id, !isChecked);
  };

  const handleEdit = () => {
    edit(todo.id, editInput?.current?.value || todo.action);
    setEditing(!isEditing);
    setInput('');
  };

  const handleCancel = () => {
    setEditing(!isEditing);
    setInput('');
  };

  const handleOnChange = (value: string) => {
    setInput(value);
  };

  useEffect(() => {
    if (todo.completed !== isChecked) setChecked(todo.completed);
  }, [todo, isChecked]);

  const renderLabelOrEdit = () => {
    return (
      <>
        {isEditing ? (
          <div className="flex w-[300px] justify-between ml-4">
            <Input
              ref={editInput}
              placeholder={todo.action}
              onChange={handleOnChange}
              value={input}
            />
            <div className="flex w-[74px] justify-between">
              <Icon iconName="plus" onClick={handleEdit} />
              <Icon iconName="x" onClick={handleCancel} />
            </div>
          </div>
        ) : (
          <label
            className={classNames(
              `${cssOptions.label} 
                                ${isChecked ? cssOptions.completed : ''}`
            )}
          >
            {todo.action}
          </label>
        )}
      </>
    );
  };

  return (
    <div id={`TodoItem-${id}`} className={classNames(`${cssOptions.base}`)}>
      <div className={'flex'}>
        <Checkbox isChecked={isChecked} onChange={handleComplete} />
        {renderLabelOrEdit()}
      </div>
      <div className={'flex justify-evenly w-24'}>
        <Icon iconName="edit" onClick={() => setEditing(!isEditing)} />
        <Icon iconName="trash" onClick={() => remove(todo)} />
      </div>
    </div>
  );
};

export default TodoItem;
