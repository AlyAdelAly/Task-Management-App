<script setup lang="ts">
import { computed } from 'vue'
import type { TaskStatus } from '~/types/task'

const props = defineProps<{ status: TaskStatus }>()

const classes = computed(() => {
  switch (props.status) {
    case 'Done':
      return 'bg-green-100 text-green-800 ring-green-600/20'
    case 'In Progress':
      return 'bg-amber-100 text-amber-800 ring-amber-600/20'
    default:
      return 'bg-slate-100 text-slate-700 ring-slate-500/20'
  }
})
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
    :class="classes"
  >
    {{ status }}
  </span>
</template>
