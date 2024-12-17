export interface Task {
  id: number;
  name: string
  due_date: string
  is_completed: boolean
}

export interface TaskForm extends Pick<Task, 'name' | 'due_date'> {}