import { calculateUtilisationRequestResponse } from './calculateUtilisationRequestResponse.service'

describe('calculateUtilisationRequestResponse', () => {
  const mockCalculation = {
    id: 'calc_123',
    userId: 'user_id_123',
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75,
    calculatedUtilisation: 75.0,
    meetsTarget: true,
    startDate: new Date('2025-01-01T00:00:00.000Z'),
    endDate: new Date('2025-01-31T00:00:00.000Z'),
    createdAt: new Date('2025-01-15T10:30:00.000Z')
  }

  it('should format successful calculation response correctly', () => {
    const result = calculateUtilisationRequestResponse(mockCalculation)

    expect(result).toEqual({
      id: 'calc_123',
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-01-31T00:00:00.000Z',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      calculatedAt: '2025-01-15T10:30:00.000Z'
    })
  })

  it('should handle calculation that meets target', () => {
    const meetingTargetCalc = {
      ...mockCalculation,
      calculatedUtilisation: 80.0,
      targetUtilisation: 75
    }

    const result = calculateUtilisationRequestResponse(meetingTargetCalc)

    expect(result.meetsTarget).toBe(true)
    expect(result.calculatedUtilisation).toBe(80.0)
    expect(result.targetUtilisation).toBe(75)
  })

  it('should handle calculation that does not meet target', () => {
    const notMeetingTargetCalc = {
      ...mockCalculation,
      calculatedUtilisation: 65.0,
      targetUtilisation: 75,
      meetsTarget: false
    }

    const result = calculateUtilisationRequestResponse(notMeetingTargetCalc)

    expect(result.meetsTarget).toBe(false)
    expect(result.calculatedUtilisation).toBe(65.0)
    expect(result.targetUtilisation).toBe(75)
  })

  it('should handle exact target match', () => {
    const exactMatchCalc = {
      ...mockCalculation,
      calculatedUtilisation: 75.0,
      targetUtilisation: 75
    }

    const result = calculateUtilisationRequestResponse(exactMatchCalc)

    expect(result.meetsTarget).toBe(true)
    expect(result.calculatedUtilisation).toBe(75.0)
    expect(result.targetUtilisation).toBe(75)
  })

  it('should format dates as ISO strings', () => {
    const customDateCalc = {
      ...mockCalculation,
      startDate: new Date('2025-02-14T08:00:00.000Z'),
      endDate: new Date('2025-02-28T17:30:00.000Z'),
      createdAt: new Date('2025-02-20T12:45:30.123Z')
    }

    const result = calculateUtilisationRequestResponse(customDateCalc)

    expect(result.startDate).toBe('2025-02-14T08:00:00.000Z')
    expect(result.endDate).toBe('2025-02-28T17:30:00.000Z')
    expect(result.calculatedAt).toBe('2025-02-20T12:45:30.123Z')
  })

  it('should handle decimal utilisation values', () => {
    const decimalCalc = {
      ...mockCalculation,
      totalHours: 37.5,
      billableHours: 25.25,
      calculatedUtilisation: 67.33,
      targetUtilisation: 70.5
    }

    const result = calculateUtilisationRequestResponse(decimalCalc)

    expect(result.totalHours).toBe(37.5)
    expect(result.billableHours).toBe(25.25)
    expect(result.calculatedUtilisation).toBe(67.33)
    expect(result.targetUtilisation).toBe(70.5)
    expect(result.meetsTarget).toBe(false) // 67.33 < 70.5
  })

  it('should handle zero utilisation', () => {
    const zeroCalc = {
      ...mockCalculation,
      billableHours: 0,
      calculatedUtilisation: 0.0,
      targetUtilisation: 50,
      meetsTarget: false
    }

    const result = calculateUtilisationRequestResponse(zeroCalc)

    expect(result.billableHours).toBe(0)
    expect(result.calculatedUtilisation).toBe(0.0)
    expect(result.meetsTarget).toBe(false)
  })

  it('should handle high utilisation values', () => {
    const highCalc = {
      ...mockCalculation,
      calculatedUtilisation: 110.0,
      targetUtilisation: 85,
      meetsTarget: true
    }

    const result = calculateUtilisationRequestResponse(highCalc)

    expect(result.calculatedUtilisation).toBe(110.0)
    expect(result.targetUtilisation).toBe(85)
    expect(result.meetsTarget).toBe(true)
  })
})