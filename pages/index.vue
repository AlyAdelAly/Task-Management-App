<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '~/stores/tasks'
import type { Task, TaskFormValues } from '~/types/task'

const store = useTasksStore()
const { filteredTasks, loading, error, searchQuery, statusFilter } =
  storeToRefs(store)

// Add/edit modal state.
const isFormOpen = ref(false)
const editingTask = ref<Task | undefined>(undefined)

// Delete-confirmation modal state. `taskToDelete` is retained while the modal
// animates closed so its title stays visible during the leave transition.
const isDeleteOpen = ref(false)
const taskToDelete = ref<Task | null>(null)

function openCreate() {
  editingTask.value = undefined
  isFormOpen.value = true
}

function openEdit(task: Task) {
  editingTask.value = task
  isFormOpen.value = true
}

function closeForm() {
  // Keep `editingTask` set so the form contents don't flicker while it closes.
  isFormOpen.value = false
}

function handleSubmit(values: TaskFormValues) {
  if (editingTask.value) {
    store.updateTask(editingTask.value.id, values)
  } else {
    store.addTask(values)
  }
  closeForm()
}

function requestDelete(task: Task) {
  taskToDelete.value = task
  isDeleteOpen.value = true
}

function confirmDelete() {
  if (taskToDelete.value) store.deleteTask(taskToDelete.value.id)
  isDeleteOpen.value = false
}

// Fetch initial data once the component mounts (client side).
onMounted(() => {
  if (store.tasks.length === 0) store.fetchTasks()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page heading + add button -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">All Tasks</h1>
        <p class="text-sm text-slate-500">
          Create, edit, filter and search your tasks.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        @click="openCreate"
      >
        <Icon name="lucide:plus" class="h-4 w-4" />
        Add task
      </button>
    </div>

    <!-- Filters -->
    <TaskFilters v-model:search="searchQuery" v-model:status="statusFilter" />

    <!-- States: loading → error → list -->
    <LoadingState v-if="loading" />
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="store.fetchTasks()"
    />
    <TaskList
      v-else
      :tasks="filteredTasks"
      @edit="openEdit"
      @delete="requestDelete"
    />

    <!-- Add / edit modal -->
    <AppModal
      :show="isFormOpen"
      :title="editingTask ? 'Edit task' : 'Add task'"
      @close="closeForm"
    >
      <TaskForm
        :initial="editingTask"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </AppModal>

    <!-- Delete confirmation modal -->
    <ConfirmDialog
      :show="isDeleteOpen"
      title="Delete task"
      :message="taskToDelete ? `Are you sure you want to delete “${taskToDelete.title}”? This can't be undone.` : ''"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="isDeleteOpen = false"
    />
  </div>
</template>
