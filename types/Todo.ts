import { v4 as uuidv4 } from 'uuid'

type Todo = {
    id: string,
    action: string,
    completed: boolean
}

export enum TodoKeys {
    ID = 'id',
    ACTION = 'action',
    COMPLETED = 'completed'
}

export const genericTodo: Todo = {
    id: uuidv4(),
    action: 'Create Todo Task',
    completed: false
}

export default Todo