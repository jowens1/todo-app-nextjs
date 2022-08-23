import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  action: string;
  completed: boolean;
};

export enum TodoKeys {
  ID = 'id',
  ACTION = 'action',
  COMPLETED = 'completed',
}

export default Todo;
