import { ensureTotalHoursIsValid } from './ensureTotalHoursIsValid.validation'

describe('ensureTotalHoursIsValid', () => {
  it('should pass with valid total hours', () => {
    expect(() => ensureTotalHoursIsValid(0.01)).not.toThrow()
    expect(() => ensureTotalHoursIsValid(8760)).not.toThrow()
    expect(() => ensureTotalHoursIsValid(40)).not.toThrow()
    expect(() => ensureTotalHoursIsValid(168)).not.toThrow()
    expect(() => ensureTotalHoursIsValid(37.5)).not.toThrow()
  })

  it('should throw error when total hours is required but missing', () => {
    expect(() => ensureTotalHoursIsValid(undefined as any))
      .toThrow('Total Hours is Required')
    expect(() => ensureTotalHoursIsValid(null as any))
      .toThrow('Total Hours is Required')
  })

  it('should throw error when total hours is not a number', () => {
    expect(() => ensureTotalHoursIsValid('40' as any))
      .toThrow('Total Hours Must be a Number')
    expect(() => ensureTotalHoursIsValid({} as any))
      .toThrow('Total Hours Must be a Number')
    expect(() => ensureTotalHoursIsValid([40] as any))
      .toThrow('Total Hours Must be a Number')
  })

  it('should throw error when total hours is zero or negative', () => {
    expect(() => ensureTotalHoursIsValid(0))
      .toThrow('Total Hours Must be Greater Than 0')
    expect(() => ensureTotalHoursIsValid(-1))
      .toThrow('Total Hours Must be Greater Than 0')
    expect(() => ensureTotalHoursIsValid(-0.5))
      .toThrow('Total Hours Must be Greater Than 0')
  })

  it('should throw error when total hours is too small', () => {
    expect(() => ensureTotalHoursIsValid(0.005))
      .toThrow('Total Hours Must be at Least 0.01')
    expect(() => ensureTotalHoursIsValid(0.001))
      .toThrow('Total Hours Must be at Least 0.01')
  })

  it('should throw error when total hours exceeds maximum', () => {
    expect(() => ensureTotalHoursIsValid(8761))
      .toThrow('Total Hours Cannot Exceed 8760 (Hours in a Year)')
    expect(() => ensureTotalHoursIsValid(10000))
      .toThrow('Total Hours Cannot Exceed 8760 (Hours in a Year)')
  })

  it('should handle edge cases correctly', () => {
    expect(() => ensureTotalHoursIsValid(Infinity))
      .toThrow('Total Hours Cannot Exceed 8760 (Hours in a Year)')
    expect(() => ensureTotalHoursIsValid(-Infinity))
      .toThrow('Total Hours Must be Greater Than 0')
  })
})