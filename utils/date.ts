/** Format an ISO yyyy-mm-dd string as a readable date, e.g. "22 Jul 2026". */
export function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

/** True when the given ISO date is strictly before today. */
export function isOverdue(iso: string): boolean {
  if (!iso) return false
  const today = new Date().toISOString().slice(0, 10)
  return iso < today
}
