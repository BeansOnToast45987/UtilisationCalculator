import { ensureBillableHoursIsValid } from './ensureBillableHoursIsValid.validation'

describe('ensureBillableHoursIsValid', () => {
  it('should pass with valid billable hours', () => {
    expect(() => ensureBillableHoursIsValid(40, 50)).not.toThrow()
    expect(() => ensureBillableHoursIsValid(0, 40)).not.toThrow()
    expect(() => ensureBillableHoursIsValid(40, 40)).not.toThrow()
    expect(() => ensureBillableHoursIsValid(0.01, 40)).not.toThrow()
    expect(() => ensureBillableHoursIsValid(37.5, 40.25)).not.toThrow()
  })

  it('should throw error when billable hours is required but missing', () => {
    expect(() => ensureBillableHoursIsValid(undefined as any, 40))
      .toThrow('Billable Hours is Required')
    expect(() => ensureBillableHoursIsValid(null as any, 40))
      .toThrow('Billable Hours is Required')
  })

  it('should throw error when billable hours is not a number', () => {
    expect(() => ensureBillableHoursIsValid('40' as any, 50))
      .toThrow('Billable Hours Must be a Number')
    expect(() => ensureBillableHoursIsValid({} as any, 50))
      .toThrow('Billable Hours Must be a Number')
  })

  it('should throw error when billable hours is negative', () => {
    expect(() => ensureBillableHoursIsValid(-1, 40))
      .toThrow('Billable Hours Cannot be Negative')
    expect(() => ensureBillableHoursIsValid(-0.5, 40))
      .toThrow('Billable Hours Cannot be Negative')
  })

  it('should throw error when billable hours is too small', () => {
    expect(() => ensureBillableHoursIsValid(0.005, 40))
      .toThrow('Billable Hours Must be 0 or at Least 0.01')
  })

  it('should throw error when billable hours exceeds total hours', () => {
    expect(() => ensureBillableHoursIsValid(50, 40))
      .toThrow('Billable Hours Cannot Exceed Total Hours')
    expect(() => ensureBillableHoursIsValid(40.01, 40))
      .toThrow('Billable Hours Cannot Exceed Total Hours')
  })

  it('should handle edge cases correctly', () => {
    expect(() => ensureBillableHoursIsValid(8760, 8760)).not.toThrow()
    expect(() => ensureBillableHoursIsValid(39.99, 40)).not.toThrow()
  })
})