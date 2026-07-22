<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    class="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
    role="alert"
  >
    <p class="mb-1 text-sm font-semibold text-red-800">Unable to load tasks</p>
    <p class="mb-4 text-sm text-red-700">{{ message }}</p>
    <button
      type="button"
      class="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
