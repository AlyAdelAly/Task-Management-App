<script setup lang="ts">
import { computed } from 'vue'
import type { TaskStatus } from '~/types/task'

const props = defineProps<{ status: TaskStatus }>()

const config = computed(() => {
  switch (props.status) {
    case 'Done':
      return {
        classes: 'bg-green-50 text-green-700 ring-green-600/20',
        icon: 'lucide:check-circle-2'
      }
    case 'In Progress':
      return {
        classes: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        icon: 'lucide:loader-circle'
      }
    default:
      return {
        classes: 'bg-slate-100 text-slate-600 ring-slate-500/20',
        icon: 'lucide:circle-dashed'
      }
  }
})
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
    :class="config.classes"
  >
    <Icon :name="config.icon" class="h-3.5 w-3.5" />
    {{ status }}
  </span>
</template>
