import type { Task } from '~/types/task'

/**
 * Mock API endpoint. Returns fully-shaped Task objects (title, description,
 * status and due date) after a short delay to simulate network latency, so the
 * app's loading state is visible. The brief explicitly allows mock data with a
 * setTimeout to simulate loading.
 */
const DELAY_MS = 600

/** Build an ISO yyyy-mm-dd date `days` from today (negative = in the past). */
function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function buildTasks(): Task[] {
  return [
    {
      id: 1,
      title: 'Finalize Q3 marketing plan',
      description: 'Consolidate channel budgets and share the draft with the team for review.',
      status: 'In Progress',
      dueDate: daysFromNow(5)
    },
    {
      id: 2,
      title: 'Review pull request #142',
      description: 'Check the new authentication flow and leave feedback before merge.',
      status: 'Pending',
      dueDate: daysFromNow(1)
    },
    {
      id: 3,
      title: 'Fix login page redirect bug',
      description: 'Users are sent to the wrong page after signing in on mobile.',
      status: 'Done',
      dueDate: daysFromNow(-3)
    },
    {
      id: 4,
      title: 'Prepare onboarding docs',
      description: 'Write a short getting-started guide for new engineers.',
      status: 'Pending',
      dueDate: daysFromNow(-2)
    },
    {
      id: 5,
      title: 'Design new dashboard layout',
      description: 'Explore a card-based layout with clearer status grouping.',
      status: 'In Progress',
      dueDate: daysFromNow(10)
    },
    {
      id: 6,
      title: 'Update project dependencies',
      description: 'Bump minor versions and run the full test suite afterwards.',
      status: 'Pending',
      dueDate: daysFromNow(3)
    },
    {
      id: 7,
      title: 'Write unit tests for auth module',
      description: 'Cover token refresh and expiry edge cases.',
      status: 'Done',
      dueDate: daysFromNow(-7)
    },
    {
      id: 8,
      title: 'Plan sprint retrospective',
      description: 'Gather feedback topics and book a 45-minute slot.',
      status: 'Pending',
      dueDate: daysFromNow(7)
    },
    {
      id: 9,
      title: 'Migrate database to v2 schema',
      description: 'Prepare the migration scripts and a rollback plan.',
      status: 'In Progress',
      dueDate: daysFromNow(14)
    },
    {
      id: 10,
      title: 'Respond to customer feedback',
      description: 'Reply to the outstanding support threads from last week.',
      status: 'Done',
      dueDate: daysFromNow(-1)
    },
    {
      id: 11,
      title: 'Refactor date utilities',
      description: 'Extract shared formatting helpers and add tests.',
      status: 'Pending',
      dueDate: daysFromNow(2)
    },
    {
      id: 12,
      title: 'Set up CI pipeline',
      description: 'Add lint, typecheck and test steps to the build workflow.',
      status: 'In Progress',
      dueDate: daysFromNow(21)
    }
  ]
}

export default defineEventHandler(async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS))
  return buildTasks()
})
