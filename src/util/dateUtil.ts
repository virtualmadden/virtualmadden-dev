const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const getMonthDay = () => {
  const today = new Date()

  return {
    day: today.getDate(),
    month: MONTH_NAMES[today.getMonth()],
  }
}
