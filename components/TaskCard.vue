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
    class="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <NuxtLink
        :to="`/tasks/${task.id}`"
        class="text-base font-semibold text-slate-900 transition group-hover:text-brand-600"
      >
        {{ task.title }}
      </NuxtLink>
      <StatusBadge :status="task.status" />
    </div>

    <p v-if="task.description" class="line-clamp-2 text-sm text-slate-600">
      {{ task.description }}
    </p>

    <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
      <span
        class="inline-flex items-center gap-1.5 text-xs font-medium"
        :class="overdue ? 'text-red-600' : 'text-slate-500'"
      >
        <Icon
          :name="overdue ? 'lucide:calendar-clock' : 'lucide:calendar'"
          class="h-4 w-4"
        />
        {{ formatDate(task.dueDate) }}
        <span v-if="overdue" class="font-semibold">· overdue</span>
      </span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          title="Edit task"
          @click="emit('edit', task)"
        >
          <Icon name="lucide:pencil" class="h-3.5 w-3.5" />
          Edit
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
          title="Delete task"
          @click="emit('delete', task)"
        >
          <Icon name="lucide:trash-2" class="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
