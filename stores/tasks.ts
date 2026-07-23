import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { StatusFilter, Task, TaskFormValues } from '~/types/task'

export const useTasksStore = defineStore('tasks', () => {
  // ---- State ----
  const tasks = ref<Task[]>([])
  // Start in the loading state: the app always fetches on load, so the first
  // paint should be the skeleton — not a brief "No tasks found" empty state.
  const loading = ref(true)
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
      // Fetch fully-shaped tasks from the local mock API (server/api/tasks.get.ts).
      tasks.value = await $fetch<Task[]>('/api/tasks')
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
