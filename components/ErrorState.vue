<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    class="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
    role="alert"
  >
    <span class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
      <Icon name="lucide:triangle-alert" class="h-6 w-6" />
    </span>
    <p class="mb-1 text-sm font-semibold text-red-800">Unable to load tasks</p>
    <p class="mb-4 text-sm text-red-700">{{ message }}</p>
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      @click="$emit('retry')"
    >
      <Icon name="lucide:rotate-cw" class="h-4 w-4" />
      Try again
    </button>
  </div>
</template>
