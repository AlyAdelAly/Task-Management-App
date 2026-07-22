import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { enrichTodo, useTasksStore } from '~/stores/tasks'
import type { TaskFormValues } from '~/types/task'

const baseValues: TaskFormValues = {
  title: 'Write report',
  description: 'Quarterly summary',
  status: 'Pending',
  dueDate: '2999-01-01'
}

describe('tasks store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a task with a unique id at the top of the list', () => {
    const store = useTasksStore()
    const created = store.addTask(baseValues)

    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0]).toEqual(created)
    expect(created.id).toBeGreaterThan(0)
    expect(created.title).toBe('Write report')
  })

  it('updates an existing task in place', () => {
    const store = useTasksStore()
    const created = store.addTask(baseValues)

    store.updateTask(created.id, { ...baseValues, status: 'Done', title: 'Done report' })

    expect(store.tasks[0].status).toBe('Done')
    expect(store.tasks[0].title).toBe('Done report')
    expect(store.tasks).toHaveLength(1)
  })

  it('deletes a task by id', () => {
    const store = useTasksStore()
    const created = store.addTask(baseValues)

    store.deleteTask(created.id)

    expect(store.tasks).toHaveLength(0)
  })

  it('filters by status and search query (case-insensitive)', () => {
    const store = useTasksStore()
    store.addTask({ ...baseValues, title: 'Alpha', status: 'Pending' })
    store.addTask({ ...baseValues, title: 'Beta', status: 'Done' })
    store.addTask({ ...baseValues, title: 'Gamma', status: 'Done' })

    // Filter by status only.
    store.statusFilter = 'Done'
    expect(store.filteredTasks.map((t) => t.title).sort()).toEqual(['Beta', 'Gamma'])

    // Combine status filter with a search query.
    store.searchQuery = 'bet'
    expect(store.filteredTasks.map((t) => t.title)).toEqual(['Beta'])

    // Reset status, search across all.
    store.statusFilter = 'All'
    store.searchQuery = 'a'
    expect(store.filteredTasks.map((t) => t.title).sort()).toEqual([
      'Alpha',
      'Beta',
      'Gamma'
    ])
  })
})

describe('enrichTodo', () => {
  it('maps a completed remote todo to a Done task', () => {
    const task = enrichTodo({ userId: 1, id: 7, title: 'Ship it', completed: true }, 0)
    expect(task.status).toBe('Done')
    expect(task.id).toBe(7)
    expect(task.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(task.description).not.toBe('')
  })

  it('derives Pending / In Progress for incomplete todos', () => {
    const even = enrichTodo({ userId: 1, id: 1, title: 'a', completed: false }, 0)
    const odd = enrichTodo({ userId: 1, id: 2, title: 'b', completed: false }, 1)
    expect(even.status).toBe('Pending')
    expect(odd.status).toBe('In Progress')
  })
})
