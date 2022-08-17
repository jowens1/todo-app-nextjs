import Input from './input'
import { useRef } from 'react'
import Todo from '../types/Todo'
import Button from './button'

type Props = {
    submit: (todo: Todo) => void
}

const TodoForm = ({submit}: Props) => {
    const todoInput = useRef<HTMLInputElement>(null)

    const addTodo = () => {
        submit({
            id: Math.floor(Math.random() * 20),
            action: todoInput?.current?.value || 'Press Edit Icon to update task!',
            completed: false,
        })
    }

    return (
        <div className='flex flex-col items-center'>
            <h1>{'Create New Todo'}</h1>
            <div>
                <Input ref={todoInput} placeholder='Add new Todo' />
                <Button onClick={addTodo}>{'Add Todo'}</Button>
            </div>
        </div>
    )
}

export default TodoForm