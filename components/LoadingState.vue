<script setup lang="ts">
// Simple skeleton placeholder shown while tasks are loading.
const placeholders = [0, 1, 2, 3]
</script>

<template>
  <div class="space-y-3" aria-busy="true" aria-live="polite">
    <span class="sr-only">Loading tasks…</span>
    <div
      v-for="n in placeholders"
      :key="n"
      class="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
    >
      <div class="mb-3 h-4 w-1/3 rounded bg-slate-200" />
      <div class="mb-2 h-3 w-2/3 rounded bg-slate-100" />
      <div class="h-3 w-1/4 rounded bg-slate-100" />
    </div>
  </div>
</template>
