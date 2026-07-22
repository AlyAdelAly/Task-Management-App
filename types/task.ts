export const TASK_STATUSES = ['Pending', 'In Progress', 'Done'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

/** Special value used by the status filter to mean "no filter". */
export type StatusFilter = TaskStatus | 'All'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  /** ISO date string (yyyy-mm-dd). */
  dueDate: string
}

/** The editable fields collected by the task form. */
export interface TaskFormValues {
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}

/** Shape returned by the JSONPlaceholder /todos endpoint. */
export interface RemoteTodo {
  userId: number
  id: number
  title: string
  completed: boolean
}
