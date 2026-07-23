<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{ show: boolean; title: string }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

function lock() {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
}

function unlock() {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
}

// Add/remove the Escape listener and scroll lock as the modal opens/closes.
watch(
  () => props.show,
  (open) => (open ? lock() : unlock())
)

// Safety net if the component is torn down while still open.
onBeforeUnmount(unlock)
</script>

<template>
  <!-- Teleport to <body> so `fixed inset-0` is relative to the viewport and the
       backdrop always covers the full screen, regardless of ancestor styles. -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="props.title"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-slate-900/50"
          @click="emit('close')"
        />
        <!-- Panel -->
        <div
          class="modal-panel relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
        >
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">{{ props.title }}</h2>
            <button
              type="button"
              class="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close"
              @click="emit('close')"
            >
              <Icon name="lucide:x" class="h-5 w-5" />
            </button>
          </div>
          <div class="px-6 py-5">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fade the whole overlay (backdrop) in/out. */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Scale + lift the panel for a subtle pop. */
.modal-panel {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}

/* Respect users who prefer reduced motion. */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-panel {
    transition: none;
  }
}
</style>
