import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  RemoteTodo,
  StatusFilter,
  Task,
  TaskFormValues,
  TaskStatus
} from '~/types/task'

/**
 * JSONPlaceholder only returns `{ userId, id, title, completed }`, so we enrich
 * each todo into our richer `Task` shape with a synthetic description, a 3-state
 * status (so all three appear in the list) and a spread of past/future due dates.
 */
export function enrichTodo(todo: RemoteTodo, index: number): Task {
  const status: TaskStatus = todo.completed
    ? 'Done'
    : index % 2 === 0
      ? 'Pending'
      : 'In Progress'

  // Spread due dates from ~5 days ago to well into the future.
  const due = new Date()
  due.setDate(due.getDate() + (index * 3 - 5))

  return {
    id: todo.id,
    title: todo.title,
    description: `Auto-generated description for "${todo.title}". Update it with the real details.`,
    status,
    dueDate: due.toISOString().slice(0, 10)
  }
}

export const useTasksStore = defineStore('tasks', () => {
  // ---- State ----
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const statusFilter = ref<StatusFilter>('All')

  // ---- Getters ----
  const filteredTasks = computed<Task[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    return tasks.value.filter((task) => {
      const matchesStatus =
        statusFilter.value === 'All' || task.status === statusFilter.value
      const matchesQuery =
        query === '' || task.title.toLowerCase().includes(query)
      return matchesStatus && matchesQuery
    })
  })

  const isEmpty = computed(() => tasks.value.length === 0)

  const getTaskById = (id: number): Task | undefined =>
    tasks.value.find((task) => task.id === id)

  // ---- Actions ----
  async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const todos = await $fetch<RemoteTodo[]>(
        `${config.public.apiBase}/todos`,
        { query: { _limit: 12 } }
      )
      tasks.value = todos.map(enrichTodo)
    } catch (err) {
      error.value =
        'Something went wrong while loading tasks. Please try again.'
      // Surfaced to the console for debugging; the UI shows the message above.
      console.error('[tasks] fetchTasks failed:', err)
    } finally {
      loading.value = false
    }
  }

  function nextId(): number {
    return tasks.value.reduce((max, task) => Math.max(max, task.id), 0) + 1
  }

  function addTask(values: TaskFormValues): Task {
    const task: Task = { id: nextId(), ...values }
    // Prepend so the newest task is visible first.
    tasks.value = [task, ...tasks.value]
    return task
  }

  function updateTask(id: number, values: TaskFormValues): void {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...values }
    }
  }

  function deleteTask(id: number): void {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return {
    // state
    tasks,
    loading,
    error,
    searchQuery,
    statusFilter,
    // getters
    filteredTasks,
    isEmpty,
    getTaskById,
    // actions
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  }
})
