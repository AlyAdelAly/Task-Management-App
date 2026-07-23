<script setup lang="ts">
import type { Task } from '~/types/task'

defineProps<{ tasks: Task[] }>()
defineEmits<{
  edit: [task: Task]
  delete: [task: Task]
}>()
</script>

<template>
  <div>
    <div
      v-if="tasks.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- Empty state (no tasks match the current filters). -->
    <div
      v-else
      class="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
    >
      <span class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon name="lucide:clipboard-list" class="h-6 w-6" />
      </span>
      <p class="text-sm font-medium text-slate-700">No tasks found</p>
      <p class="mt-1 text-sm text-slate-500">
        Try adjusting your search or filters, or add a new task.
      </p>
    </div>
  </div>
</template>
