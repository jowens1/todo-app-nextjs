import Todo from '../types/Todo'
import Checkbox from './checkbox'
import { useLayoutEffect, useRef, useState } from 'react'
import { classNames } from '../utils/util'
import Icon from './icon'
import Input from './input'
import Button from './button'

import { v4 as uuidv4 } from 'uuid'

type Props = {
    todo: Todo
    id: number
    complete: (id:string, isCompleted: boolean) => void
    edit: (id: string, editedAction: string) => void
    copy: (todo: Todo) => void
    remove: (todo: Todo) => void
}

const cssOptions = {
    base: 'flex max-h-12 justify-between min-w-full',
    label: 'flex max-w-md overflow-auto justify-center ml-4',
    completed: 'line-through'
}

const TodoItem = ({todo, id, complete, edit, copy, remove }: Props) => {
    const editInput = useRef<HTMLInputElement>(null)
    const [isChecked, setChecked] = useState(todo.completed)
    const [isEditing, setEditing] = useState(false)
    const handleComplete = () => {
        setChecked(!isChecked)
        complete(todo.id, !isChecked)
    }
    
    const handleCopy = (todo: Todo) => {
        const newTodo:Todo = {
            id: uuidv4(),
            action: todo.action,
            completed: todo.completed
        }
       
        copy(newTodo)
    }

    const handleEdit = () => {
        edit(todo.id, editInput?.current?.value || todo.action)
        setEditing(!isEditing)
    }

    useLayoutEffect(() => {
        if (todo.completed !== isChecked) setChecked(todo.completed)
    },[todo, isChecked])

    const renderLabelOrEdit = () => {
        return (
            <>
                {isEditing 
                    ? <>
                        <Input ref={editInput} placeholder={todo.action} /> 
                        <Button onClick={() => handleEdit()}>{'Update Todo'}</Button>
                    </>
                    :  <label 
                        className={
                            classNames(
                                `${cssOptions.label} 
                                ${isChecked ? cssOptions.completed : ''}`
                            )
                        } 
                    onClick={() => console.log('label clicked', todo.action)}
                >
                    {todo.action}
                </label>
                }
            </>
        )
    }

    return (
        <div id={`TodoItem-${id}`} className={classNames(`${cssOptions.base}`)}>
            <div className={'flex'}>
                <Checkbox isChecked={isChecked} onChange={() => handleComplete()} />
                {renderLabelOrEdit()}
            </div>
            <div className={'flex justify-evenly w-24'} >
                <Icon iconName='editPen' onClick={() => setEditing(!isEditing)}/>
                <Icon iconName='copy' onClick={() => handleCopy(todo)}/>
                <Icon iconName='trashcan' onClick={() => remove(todo)}/>
            </div> 
        </div>
    )
}

export default TodoItem