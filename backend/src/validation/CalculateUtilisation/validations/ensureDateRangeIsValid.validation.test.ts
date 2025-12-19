import { ensureDateRangeIsValid } from './ensureDateRangeIsValid.validation'

describe('ensureDateRangeIsValid', () => {
  it('should pass with valid date ranges', () => {
    expect(() => ensureDateRangeIsValid('2025-01-01', '2025-01-31')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2025-01-01T00:00:00.000Z', '2025-01-02T00:00:00.000Z')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2025-01-01', '2025-01-02')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2025-01-01', '2025-12-31')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2024-12-01', '2025-01-31')).not.toThrow()
  })

  it('should throw error when dates are required but missing', () => {
    expect(() => ensureDateRangeIsValid('', '2025-01-31'))
      .toThrow('Start Date and End Date are Required')
    expect(() => ensureDateRangeIsValid('2025-01-01', ''))
      .toThrow('Start Date and End Date are Required')
    expect(() => ensureDateRangeIsValid(null as any, '2025-01-31'))
      .toThrow('Start Date and End Date are Required')
  })

  it('should throw error for invalid date formats', () => {
    expect(() => ensureDateRangeIsValid('invalid-date', '2025-01-31'))
      .toThrow('Invalid Start Date Format')
    expect(() => ensureDateRangeIsValid('2025-01-01', 'not-a-date'))
      .toThrow('Invalid End Date Format')
    expect(() => ensureDateRangeIsValid('hello', '2025-01-31'))
      .toThrow('Invalid Start Date Format')
  })

  it('should throw error when start date is not before end date', () => {
    expect(() => ensureDateRangeIsValid('2025-01-31', '2025-01-01'))
      .toThrow('Start Date Must be Before End Date')
    expect(() => ensureDateRangeIsValid('2025-01-01', '2025-01-01'))
      .toThrow('Start Date Must be Before End Date')
    expect(() => ensureDateRangeIsValid('2025-01-02', '2025-01-01'))
      .toThrow('Start Date Must be Before End Date')
  })

  it('should throw error when date range exceeds 365 days', () => {
    expect(() => ensureDateRangeIsValid('2025-01-01', '2026-01-02'))
      .toThrow('Date Range Cannot Exceed 365 Days')
    expect(() => ensureDateRangeIsValid('2025-01-01', '2026-06-01'))
      .toThrow('Date Range Cannot Exceed 365 Days')
  })

  it('should handle edge cases correctly', () => {
    // Leap year and month boundaries
    expect(() => ensureDateRangeIsValid('2024-02-28', '2024-02-29')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2025-01-31', '2025-02-01')).not.toThrow()
    expect(() => ensureDateRangeIsValid('2024-12-31', '2025-01-01')).not.toThrow()
  })
})