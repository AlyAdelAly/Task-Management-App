<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { TASK_STATUSES } from '~/types/task'
import type { StatusFilter } from '~/types/task'

// Two-way bound from the parent (kept in the Pinia store).
const search = defineModel<string>('search', { default: '' })
const status = defineModel<StatusFilter>('status', { default: 'All' })

interface StatusOption {
  value: StatusFilter
  label: string
  icon: string
  color: string
}

const options: StatusOption[] = [
  { value: 'All', label: 'All statuses', icon: 'lucide:list-filter', color: 'text-slate-500' },
  ...TASK_STATUSES.map((s): StatusOption => {
    if (s === 'Done') return { value: s, label: s, icon: 'lucide:check-circle-2', color: 'text-green-600' }
    if (s === 'In Progress') return { value: s, label: s, icon: 'lucide:loader-circle', color: 'text-amber-600' }
    return { value: s, label: s, icon: 'lucide:circle-dashed', color: 'text-slate-500' }
  })
]

const selected = computed(
  () => options.find((o) => o.value === status.value) ?? options[0]
)

// --- Dropdown open/close handling ---
const open = ref(false)
const root = ref<HTMLElement | null>(null)

function choose(value: StatusFilter) {
  status.value = value
  open.value = false
}

function onDocumentPointer(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointer)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentPointer)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
    <!-- Search by title -->
    <div class="relative flex-1">
      <Icon
        name="lucide:search"
        class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
      <input
        v-model="search"
        type="search"
        placeholder="Search by title…"
        aria-label="Search tasks by title"
        class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
    </div>

    <!-- Filter by status (custom dropdown) -->
    <div ref="root" class="relative sm:w-52">
      <button
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="open"
        class="flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-2.5 text-sm shadow-sm transition hover:border-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        :class="{ 'border-brand-500 ring-2 ring-brand-500/30': open }"
        @click="open = !open"
      >
        <Icon :name="selected.icon" class="h-4 w-4 shrink-0" :class="selected.color" />
        <span class="flex-1 truncate text-left font-medium text-slate-700">
          {{ selected.label }}
        </span>
        <Icon
          name="lucide:chevron-down"
          class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200"
          :class="{ 'rotate-180': open }"
        />
      </button>

      <Transition name="dropdown">
        <ul
          v-if="open"
          role="listbox"
          class="absolute right-0 z-20 mt-2 w-full min-w-[12rem] overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5"
        >
          <li v-for="opt in options" :key="opt.value">
            <button
              type="button"
              role="option"
              :aria-selected="opt.value === status"
              class="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition"
              :class="
                opt.value === status
                  ? 'bg-brand-50 font-medium text-brand-700'
                  : 'text-slate-700 hover:bg-slate-50'
              "
              @click="choose(opt.value)"
            >
              <Icon :name="opt.icon" class="h-4 w-4 shrink-0" :class="opt.color" />
              <span class="flex-1 text-left">{{ opt.label }}</span>
              <Icon
                v-if="opt.value === status"
                name="lucide:check"
                class="h-4 w-4 shrink-0 text-brand-600"
              />
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
