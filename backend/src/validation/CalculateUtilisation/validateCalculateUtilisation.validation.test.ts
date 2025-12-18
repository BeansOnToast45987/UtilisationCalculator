import { validateCalculateUtilisationInput } from './validateCalculateUtilisation.validation'
import {
  ensureBillableHoursIsValid,
  ensureDateRangeIsValid,
  ensureTargetUtilisationIsValid,
  ensureTotalHoursIsValid,
} from './validations/index'

jest.mock('./validations/index')

const mockEnsureDateRangeIsValid = ensureDateRangeIsValid as jest.MockedFunction<typeof ensureDateRangeIsValid>
const mockEnsureTotalHoursIsValid = ensureTotalHoursIsValid as jest.MockedFunction<typeof ensureTotalHoursIsValid>
const mockEnsureBillableHoursIsValid = ensureBillableHoursIsValid as jest.MockedFunction<typeof ensureBillableHoursIsValid>
const mockEnsureTargetUtilisationIsValid = ensureTargetUtilisationIsValid as jest.MockedFunction<typeof ensureTargetUtilisationIsValid>

describe('validateCalculateUtilisationInput', () => {
  const mockInput = {
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call all validation functions with correct parameters', () => {
    mockEnsureDateRangeIsValid.mockImplementation(() => {})
    mockEnsureTotalHoursIsValid.mockImplementation(() => {})
    mockEnsureBillableHoursIsValid.mockImplementation(() => {})
    mockEnsureTargetUtilisationIsValid.mockImplementation(() => {})

    validateCalculateUtilisationInput(mockInput)

    expect(mockEnsureDateRangeIsValid).toHaveBeenCalledWith('2025-01-01', '2025-01-31')
    expect(mockEnsureTotalHoursIsValid).toHaveBeenCalledWith(160)
    expect(mockEnsureBillableHoursIsValid).toHaveBeenCalledWith(120, 160)
    expect(mockEnsureTargetUtilisationIsValid).toHaveBeenCalledWith(75)
  })

  it('should propagate date range validation errors', () => {
    mockEnsureDateRangeIsValid.mockImplementation(() => {
      throw new Error('Start Date Must be Before End Date')
    })

    expect(() => validateCalculateUtilisationInput(mockInput))
      .toThrow('Start Date Must be Before End Date')
  })

  it('should propagate total hours validation errors', () => {
    mockEnsureDateRangeIsValid.mockImplementation(() => {})
    mockEnsureTotalHoursIsValid.mockImplementation(() => {
      throw new Error('Total Hours Must be Greater Than 0')
    })

    expect(() => validateCalculateUtilisationInput(mockInput))
      .toThrow('Total Hours Must be Greater Than 0')
  })

  it('should propagate billable hours validation errors', () => {
    mockEnsureDateRangeIsValid.mockImplementation(() => {})
    mockEnsureTotalHoursIsValid.mockImplementation(() => {})
    mockEnsureBillableHoursIsValid.mockImplementation(() => {
      throw new Error('Billable Hours Cannot Exceed Total Hours')
    })

    expect(() => validateCalculateUtilisationInput(mockInput))
      .toThrow('Billable Hours Cannot Exceed Total Hours')
  })

  it('should propagate target utilisation validation errors', () => {
    mockEnsureDateRangeIsValid.mockImplementation(() => {})
    mockEnsureTotalHoursIsValid.mockImplementation(() => {})
    mockEnsureBillableHoursIsValid.mockImplementation(() => {})
    mockEnsureTargetUtilisationIsValid.mockImplementation(() => {
      throw new Error('Target Utilisation Must be Between 1 and 100')
    })

    expect(() => validateCalculateUtilisationInput(mockInput))
      .toThrow('Target Utilisation Must be Between 1 and 100')
  })
})
