import Todo from '../types/Todo'
import TodoItem from './todoItem'

type Props = {
    todos: Todo[],
    complete: (id: number, isCompleted: boolean) => void
    edit: (id: number, editedAction: string) => void
    copy: (todo: Todo) => void
    remove: (todo: Todo) => void
}

const TodoList = ({todos, complete, edit, copy, remove}: Props) => {
    const renderList = () => 
        todos.map((todo, index) => 
            <li key={index} className='mb-1'>
                <TodoItem todo={todo} id={index} complete={complete} edit={edit} copy={copy} remove={remove} />
            </li>)

    return (
        <div className='min-w-full'>
            <ul>
                {renderList()}
            </ul>
        </div>
    )
}

export default TodoList