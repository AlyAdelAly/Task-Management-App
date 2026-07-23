# Task Management Mini App

A small task-management app built for the Vue.js technical task. It lets you list,
create, edit, delete, filter and search tasks — each with a **title**, **description**,
**status** (Pending / In Progress / Done) and **due date** — with clear loading and
error states, and initial data fetched from a mock API.

## Tech stack

| Concern         | Choice                                             |
| --------------- | -------------------------------------------------- |
| Framework       | **Nuxt 3** (Vue 3, Composition API, `<script setup>`) |
| Language        | **TypeScript**                                     |
| State           | **Pinia**                                          |
| Styling         | **Tailwind CSS** (via Nuxt's built-in PostCSS)     |
| Icons           | **Nuxt Icon** + Lucide (`lucide:*`, bundled locally) |
| Routing         | Nuxt file-based routing (list + detail pages)      |
| Mock API        | Local Nuxt server route (`/api/tasks`)             |
| Tests           | **Vitest** + Vue Test Utils                        |

All bonus items from the brief are included: TypeScript, Nuxt.js, and unit tests.

## Getting started

Prerequisites: **Node.js ≥ 18** and npm.

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:3000)
npm run build     # production build
npm run preview   # preview the production build
npm run test      # run unit tests once
npm run typecheck # type-check the project
```

## Features (mapped to the brief)

**Functional**

- ✅ Task list — title, description, status and due date per task.
- ✅ Add-task form with validation: **title required**, **due date must be in the future**.
- ✅ Edit and delete existing tasks; delete asks for confirmation in a styled modal.
- ✅ Filter by status and search by title (case-insensitive).
- ✅ Initial data fetched from a mock API (JSONPlaceholder); the loading state covers the request.
- ✅ Clear **loading** (skeletons) and **error** (with retry) states.

**UX polish**

- Add/edit and delete confirmation use a shared modal that is **teleported to `<body>`**
  (so the backdrop always covers the full viewport) with **enter/leave animations**
  that respect `prefers-reduced-motion`.
- Overdue, not-done tasks are flagged in red on both the card and the detail page.

**Technical**

- ✅ Vue 3 + Composition API (`<script setup lang="ts">`).
- ✅ State management with Pinia (setup-store syntax).
- ✅ Tailwind CSS styling.
- ✅ Split into small, reusable components.
- ✅ Routing with a task detail page (`/tasks/:id`).
- ✅ Bonus: TypeScript, Nuxt.js, unit tests (Vitest).

## Project structure

```
├─ app.vue                     # App shell (header + <NuxtPage>)
├─ pages/
│  ├─ index.vue                # Task list, filters, add/edit modal
│  └─ tasks/[id].vue           # Task detail page
├─ components/
│  ├─ TaskList.vue             # Grid of task cards + empty state
│  ├─ TaskCard.vue             # Single task summary + edit/delete/link
│  ├─ TaskForm.vue             # Add/edit form + validation (reused for both)
│  ├─ TaskFilters.vue          # Status filter + title search (v-model)
│  ├─ StatusBadge.vue          # Colored status pill
│  ├─ AppModal.vue             # Teleported, animated modal wrapper (Escape/backdrop close)
│  ├─ ConfirmDialog.vue        # Delete confirmation dialog (built on AppModal)
│  ├─ LoadingState.vue         # Skeleton placeholders
│  └─ ErrorState.vue           # Error message + retry button
├─ server/api/tasks.get.ts     # Mock API: GET /api/tasks (delayed, full Task shape)
├─ stores/tasks.ts             # Pinia store: state, getters, CRUD actions
├─ types/task.ts               # Task / TaskStatus / form types
├─ utils/date.ts               # Date formatting + overdue helper
└─ tests/                      # Vitest specs (store + form validation)
```

## Notes on the mock API

Initial data comes from a **local mock API** served by Nuxt's server engine at
[`server/api/tasks.get.ts`](server/api/tasks.get.ts). A `GET /api/tasks` request
returns fully-shaped `Task` objects — `title`, `description`, three-state `status`
and `dueDate` — after a short `setTimeout` delay so the loading state is visible.
Due dates are generated relative to today, so some tasks are overdue and some are
upcoming.

Because it's a read-only mock, **create / edit / delete** are handled as optimistic
updates in the Pinia store (they aren't persisted back to the server), which means
they reset on a full page refresh.

## Performance considerations

- Filtering/search is a single Pinia `computed` getter, so it only recomputes when the
  task list or filter inputs change.
- Lists use stable `:key="task.id"`.
- The UI is split into small components so re-renders stay localized.

## Tests

Two spec files under `tests/`:

- `tasks.store.spec.ts` — store CRUD and the `filteredTasks` getter (status + search).
- `TaskForm.spec.ts` — form validation (blocks empty title / past due date, emits on
  valid input).

Run them with `npm run test`.
