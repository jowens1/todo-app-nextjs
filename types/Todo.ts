type Todo = {
    id: number,
    action: string,
    completed: boolean
}

export enum TodoKeys {
    ID = 'id',
    ACTION = 'action',
    COMPLETED = 'completed'
}

export const genericTodo: Todo = {
    id: 0,
    action: 'Create Todo Task',
    completed: false
}

export default Todo