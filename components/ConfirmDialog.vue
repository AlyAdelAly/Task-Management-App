<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean
    title?: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  {
    title: 'Are you sure?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel'
  }
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <AppModal :show="show" :title="title" @close="emit('cancel')">
    <p class="text-sm text-slate-600">{{ message }}</p>

    <div class="mt-6 flex justify-end gap-3">
      <button
        type="button"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        @click="emit('cancel')"
      >
        {{ cancelLabel }}
      </button>
      <button
        type="button"
        class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        @click="emit('confirm')"
      >
        {{ confirmLabel }}
      </button>
    </div>
  </AppModal>
</template>
