<script setup lang="ts">
import { TASK_STATUSES } from '~/types/task'
import type { StatusFilter } from '~/types/task'

// Two-way bound from the parent (kept in the Pinia store).
const search = defineModel<string>('search', { default: '' })
const status = defineModel<StatusFilter>('status', { default: 'All' })

const options: StatusFilter[] = ['All', ...TASK_STATUSES]
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <!-- Search by title -->
    <div class="relative flex-1">
      <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <input
        v-model="search"
        type="search"
        placeholder="Search by title…"
        aria-label="Search tasks by title"
        class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
    </div>

    <!-- Filter by status -->
    <div class="sm:w-48">
      <label class="sr-only" for="statusFilter">Filter by status</label>
      <select
        id="statusFilter"
        v-model="status"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <option v-for="opt in options" :key="opt" :value="opt">
          {{ opt === 'All' ? 'All statuses' : opt }}
        </option>
      </select>
    </div>
  </div>
</template>
