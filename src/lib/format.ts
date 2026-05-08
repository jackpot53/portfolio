export function formatPeriod(startedAt: string, endedAt: string | null): string {
  const toYearMonth = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    return `${year}.${month}`
  }
  const end = endedAt ? toYearMonth(endedAt) : '현재'
  return `${toYearMonth(startedAt)} – ${end}`
}
