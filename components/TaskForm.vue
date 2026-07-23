<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { TASK_STATUSES } from '~/types/task'
import type { Task, TaskFormValues, TaskStatus } from '~/types/task'

const props = defineProps<{
  /** When provided the form is in "edit" mode and prefills with this task. */
  initial?: Task
  submitting?: boolean
}>()

const emit = defineEmits<{
  submit: [values: TaskFormValues]
  cancel: []
}>()

const form = reactive<TaskFormValues>({
  title: props.initial?.title ?? '',
  description: props.initial?.description ?? '',
  status: props.initial?.status ?? 'Pending',
  dueDate: props.initial?.dueDate ?? ''
})

// Track which fields have been interacted with so we don't shout errors up front.
const touched = reactive({ title: false, dueDate: false })

/** Today's date as yyyy-mm-dd — used both for validation and the input's `min`. */
const today = new Date().toISOString().slice(0, 10)

const titleError = computed(() =>
  form.title.trim() === '' ? 'Title is required.' : ''
)

const dueDateError = computed(() => {
  if (form.dueDate === '') return 'Due date is required.'
  // ISO yyyy-mm-dd strings compare correctly as plain strings.
  if (form.dueDate <= today) return 'Due date must be in the future.'
  return ''
})

const isValid = computed(() => !titleError.value && !dueDateError.value)

function onSubmit() {
  touched.title = true
  touched.dueDate = true
  if (!isValid.value) return
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    dueDate: form.dueDate
  })
}

const statuses = TASK_STATUSES as readonly TaskStatus[]
</script>

<template>
  <form class="space-y-4" novalidate @submit.prevent="onSubmit">
    <!-- Title -->
    <div>
      <label for="title" class="mb-1 block text-sm font-medium text-slate-700">
        Title <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="e.g. Prepare project proposal"
        class="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        :class="touched.title && titleError ? 'border-red-400' : 'border-slate-300'"
        @blur="touched.title = true"
      />
      <p v-if="touched.title && titleError" class="mt-1 text-xs text-red-600">
        {{ titleError }}
      </p>
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="mb-1 block text-sm font-medium text-slate-700">
        Description
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        placeholder="Optional details…"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <!-- Status -->
      <div>
        <label for="status" class="mb-1 block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status"
          v-model="form.status"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Due date -->
      <div>
        <label for="dueDate" class="mb-1 block text-sm font-medium text-slate-700">
          Due date <span class="text-red-500">*</span>
        </label>
        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
          :min="today"
          class="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          :class="touched.dueDate && dueDateError ? 'border-red-400' : 'border-slate-300'"
          @blur="touched.dueDate = true"
        />
        <p v-if="touched.dueDate && dueDateError" class="mt-1 text-xs text-red-600">
          {{ dueDateError }}
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="submitting"
        class="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon :name="props.initial ? 'lucide:save' : 'lucide:plus'" class="h-4 w-4" />
        {{ props.initial ? 'Save changes' : 'Add task' }}
      </button>
    </div>
  </form>
</template>
