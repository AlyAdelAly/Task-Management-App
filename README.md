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
| Routing         | Nuxt file-based routing (list + detail pages)      |
| Mock API        | **JSONPlaceholder** `/todos`                       |
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
- ✅ Edit and delete existing tasks (delete asks for confirmation).
- ✅ Filter by status and search by title (case-insensitive).
- ✅ Initial data fetched from a mock API (JSONPlaceholder); the loading state covers the request.
- ✅ Clear **loading** (skeletons) and **error** (with retry) states.

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
│  ├─ AppModal.vue             # Accessible modal wrapper
│  ├─ LoadingState.vue         # Skeleton placeholders
│  └─ ErrorState.vue           # Error message + retry button
├─ stores/tasks.ts             # Pinia store: state, getters, CRUD actions
├─ types/task.ts               # Task / TaskStatus / form types
├─ utils/date.ts               # Date formatting + overdue helper
└─ tests/                      # Vitest specs (store + form validation)
```

## Notes on the mock API

`GET https://jsonplaceholder.typicode.com/todos` only returns
`{ userId, id, title, completed }` — it has **no** description, no three-state status
and no due date, and it does **not** persist writes. To demonstrate the full feature
set, the store:

- fetches a slice of todos and **enriches** each one into the app's `Task` shape
  (synthetic description, a status derived so all three states appear, and a spread of
  past/future due dates — see `enrichTodo` in `stores/tasks.ts`), and
- treats **create / edit / delete** as optimistic updates held in the Pinia store
  (they are not sent back to JSONPlaceholder, since it wouldn't persist them anyway).

The API base URL is configurable via the `NUXT_PUBLIC_API_BASE` environment variable.

## Performance considerations

- Filtering/search is a single Pinia `computed` getter, so it only recomputes when the
  task list or filter inputs change.
- Lists use stable `:key="task.id"`.
- The UI is split into small components so re-renders stay localized.

## Tests

Two spec files under `tests/`:

- `tasks.store.spec.ts` — store CRUD, the `filteredTasks` getter, and `enrichTodo`.
- `TaskForm.spec.ts` — form validation (blocks empty title / past due date, emits on
  valid input).

Run them with `npm run test`.
