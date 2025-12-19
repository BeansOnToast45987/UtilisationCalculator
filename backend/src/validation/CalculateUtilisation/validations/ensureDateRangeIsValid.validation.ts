const ensureDateRangeIsValid = (startDate: string, endDate: string): void => {
  if (!startDate || !endDate) {
    throw new Error('Start Date and End Date are Required')
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime())) {
    throw new Error('Invalid Start Date Format')
  }

  if (isNaN(end.getTime())) {
    throw new Error('Invalid End Date Format')
  }

  if (start >= end) {
    throw new Error('Start Date Must be Before End Date')
  }

  const daysDifference =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  if (daysDifference > 365) {
    throw new Error('Date Range Cannot Exceed 365 Days')
  }
}

export { ensureDateRangeIsValid }
