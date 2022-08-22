import Todo from '../types/Todo';
import Checkbox from './checkbox';
import { useEffect, useRef, useState } from 'react';
import { classNames } from '../utils/util';
import Icon from './icon';
import Input from './input';

import { v4 as uuidv4 } from 'uuid';

type Props = {
  todo: Todo;
  id: number;
  complete: (id: string, isCompleted: boolean) => void;
  edit: (id: string, editedAction: string) => void;
  copy: (todo: Todo) => void;
  remove: (todo: Todo) => void;
};

const cssOptions = {
  base: 'flex max-h-12 justify-between min-w-full',
  label: 'flex max-w-md overflow-auto items-center ml-4',
  completed: 'line-through',
};

const TodoItem = ({ todo, id, complete, edit, copy, remove }: Props) => {
  const editInput = useRef<HTMLInputElement>(null);
  const [isChecked, setChecked] = useState(todo.completed);
  const [isEditing, setEditing] = useState(false);
  const handleComplete = () => {
    setChecked(!isChecked);
    complete(todo.id, !isChecked);
  };

  const handleCopy = (todo: Todo) => {
    const newTodo: Todo = {
      id: uuidv4(),
      action: todo.action,
      completed: todo.completed,
    };

    copy(newTodo);
  };

  const handleEdit = () => {
    edit(todo.id, editInput?.current?.value || todo.action);
    setEditing(!isEditing);
  };

  const handleCancel = () => setEditing(!isEditing);

  useEffect(() => {
    if (todo.completed !== isChecked) setChecked(todo.completed);
  }, [todo, isChecked]);

  const renderLabelOrEdit = () => {
    return (
      <>
        {isEditing ? (
          <div className="flex w-[300px] justify-between ml-4">
            <Input ref={editInput} placeholder={todo.action} />
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
      <div className={'flex justify-evenly w-32'}>
        <Icon iconName="edit" onClick={() => setEditing(!isEditing)} />
        <Icon iconName="copy" onClick={() => handleCopy(todo)} />
        <Icon iconName="trash" onClick={() => remove(todo)} />
      </div>
    </div>
  );
};

export default TodoItem;
