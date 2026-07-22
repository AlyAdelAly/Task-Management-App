<script setup lang="ts">
// Root shell. The header stays constant across pages; NuxtPage renders the route.
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-5xl items-center gap-2 px-4 py-4">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <NuxtLink to="/" class="text-lg font-semibold text-slate-900">
          Task Manager
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <NuxtPage />
    </main>
  </div>
</template>
