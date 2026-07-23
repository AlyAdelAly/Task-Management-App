<script setup lang="ts">
// Root shell. The header stays constant across pages; NuxtPage renders the route.
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header
      class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur"
    >
      <div class="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3.5">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm"
        >
          <Icon name="lucide:list-checks" class="h-5 w-5" />
        </span>
        <div class="leading-tight">
          <NuxtLink to="/" class="block text-base font-semibold text-slate-900">
            Task Manager
          </NuxtLink>
          <span class="text-xs text-slate-500">Organize your work</span>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <NuxtPage />
    </main>
  </div>
</template>
