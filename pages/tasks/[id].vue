<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '~/stores/tasks'
import type { TaskFormValues } from '~/types/task'
import { formatDate, isOverdue } from '~/utils/date'

const route = useRoute()
const router = useRouter()
const store = useTasksStore()

const taskId = computed(() => Number(route.params.id))
const task = computed(() => store.getTaskById(taskId.value))

const overdue = computed(
  () => !!task.value && task.value.status !== 'Done' && isOverdue(task.value.dueDate)
)

const isEditing = ref(false)
const isConfirmingDelete = ref(false)

function handleSubmit(values: TaskFormValues) {
  if (task.value) store.updateTask(task.value.id, values)
  isEditing.value = false
}

function confirmDelete() {
  if (task.value) store.deleteTask(task.value.id)
  isConfirmingDelete.value = false
  router.push('/')
}

// Support direct navigation / refresh: load tasks if the store is empty.
onMounted(() => {
  if (store.tasks.length === 0 && !store.loading) store.fetchTasks()
})
</script>

<template>
  <div class="space-y-6">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800"
    >
      <Icon name="lucide:arrow-left" class="h-4 w-4" />
      Back to tasks
    </NuxtLink>

    <LoadingState v-if="store.loading" />

    <!-- Task detail -->
    <article
      v-else-if="task"
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div class="flex items-start justify-between gap-4">
        <h1 class="text-2xl font-bold text-slate-900">{{ task.title }}</h1>
        <StatusBadge :status="task.status" />
      </div>

      <dl class="mt-5 space-y-4 text-sm">
        <div class="flex items-center gap-2">
          <Icon
            :name="overdue ? 'lucide:calendar-clock' : 'lucide:calendar'"
            class="h-4 w-4"
            :class="overdue ? 'text-red-500' : 'text-slate-400'"
          />
          <dt class="sr-only">Due date</dt>
          <dd :class="overdue ? 'font-medium text-red-600' : 'text-slate-700'">
            Due {{ formatDate(task.dueDate) }}
            <span v-if="overdue">· overdue</span>
          </dd>
        </div>
        <div class="flex items-start gap-2">
          <Icon name="lucide:align-left" class="mt-0.5 h-4 w-4 text-slate-400" />
          <div>
            <dt class="mb-0.5 font-medium text-slate-500">Description</dt>
            <dd class="whitespace-pre-line text-slate-800">
              {{ task.description || 'No description provided.' }}
            </dd>
          </div>
        </div>
      </dl>

      <div class="mt-6 flex gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
          @click="isEditing = true"
        >
          <Icon name="lucide:pencil" class="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          @click="isConfirmingDelete = true"
        >
          <Icon name="lucide:trash-2" class="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>

    <!-- Not found -->
    <div
      v-else
      class="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
    >
      <span class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon name="lucide:search-x" class="h-6 w-6" />
      </span>
      <p class="text-sm font-medium text-slate-700">Task not found</p>
      <p class="mt-1 text-sm text-slate-500">
        It may have been deleted. Go back to the
        <NuxtLink to="/" class="text-brand-600 underline">task list</NuxtLink>.
      </p>
    </div>

    <!-- Edit modal -->
    <AppModal
      :show="isEditing && !!task"
      title="Edit task"
      @close="isEditing = false"
    >
      <TaskForm
        :initial="task"
        @submit="handleSubmit"
        @cancel="isEditing = false"
      />
    </AppModal>

    <!-- Delete confirmation modal -->
    <ConfirmDialog
      :show="isConfirmingDelete && !!task"
      title="Delete task"
      :message="task ? `Are you sure you want to delete “${task.title}”? This can't be undone.` : ''"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="isConfirmingDelete = false"
    />
  </div>
</template>
