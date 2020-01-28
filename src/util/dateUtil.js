const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const getMonthDay = () => {
  let today = new Date()

  return {
    day: today.getDate(),
    month: MONTH_NAMES[today.getMonth()]
  }
}

export { getMonthDay }
