<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '~/types/task'
import { formatDate, isOverdue } from '~/utils/date'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  edit: [task: Task]
  delete: [task: Task]
}>()

const overdue = computed(
  () => props.task.status !== 'Done' && isOverdue(props.task.dueDate)
)
</script>

<template>
  <article
    class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <NuxtLink
        :to="`/tasks/${task.id}`"
        class="text-base font-semibold text-slate-900 hover:text-brand-600 hover:underline"
      >
        {{ task.title }}
      </NuxtLink>
      <StatusBadge :status="task.status" />
    </div>

    <p v-if="task.description" class="line-clamp-2 text-sm text-slate-600">
      {{ task.description }}
    </p>

    <div class="mt-auto flex items-center justify-between pt-1">
      <span
        class="text-xs font-medium"
        :class="overdue ? 'text-red-600' : 'text-slate-500'"
      >
        Due {{ formatDate(task.dueDate) }}
        <span v-if="overdue">· overdue</span>
      </span>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
          @click="emit('edit', task)"
        >
          Edit
        </button>
        <button
          type="button"
          class="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
          @click="emit('delete', task)"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
