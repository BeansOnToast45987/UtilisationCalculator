import { getUtilisationRequestResponse } from './getUtilisationRequestResponse.service'

describe('getUtilisationRequestResponse', () => {
  const mockUtilisations = [
    {
      id: 'calc_1',
      userId: 'user_id_123',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      startDate: new Date('2025-01-01T00:00:00.000Z'),
      endDate: new Date('2025-01-31T00:00:00.000Z'),
      createdAt: new Date('2025-02-01T10:30:00.000Z')
    },
    {
      id: 'calc_2',
      userId: 'user_id_123',
      totalHours: 80,
      billableHours: 40,
      targetUtilisation: 70,
      calculatedUtilisation: 50.0,
      meetsTarget: false,
      startDate: new Date('2025-02-01T00:00:00.000Z'),
      endDate: new Date('2025-02-15T00:00:00.000Z'),
      createdAt: new Date('2025-02-16T15:45:00.000Z')
    }
  ]

  it('should format multiple utilisation records correctly', () => {
    const result = getUtilisationRequestResponse(mockUtilisations)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      id: 'calc_1',
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-01-31T00:00:00.000Z',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      calculatedAt: '2025-02-01T10:30:00.000Z'
    })
    expect(result[1]).toEqual({
      id: 'calc_2',
      startDate: '2025-02-01T00:00:00.000Z',
      endDate: '2025-02-15T00:00:00.000Z',
      totalHours: 80,
      billableHours: 40,
      targetUtilisation: 70,
      calculatedUtilisation: 50.0,
      meetsTarget: false,
      calculatedAt: '2025-02-16T15:45:00.000Z'
    })
  })

  it('should handle empty array', () => {
    const result = getUtilisationRequestResponse([])
    expect(result).toEqual([])
  })

  it('should format single utilisation record', () => {
    const singleRecord = [mockUtilisations[0]!]
    const result = getUtilisationRequestResponse(singleRecord)

    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('calc_1')
    expect(result[0]!.startDate).toBe('2025-01-01T00:00:00.000Z')
    expect(result[0]!.calculatedAt).toBe('2025-02-01T10:30:00.000Z')
  })

  it('should handle decimal values correctly', () => {
    const decimalRecord = [{
      id: 'calc_3',
      userId: 'user_id_123',
      totalHours: 37.5,
      billableHours: 25.25,
      targetUtilisation: 70,
      calculatedUtilisation: 67.33,
      meetsTarget: false,
      startDate: new Date('2025-03-01T00:00:00.000Z'),
      endDate: new Date('2025-03-15T00:00:00.000Z'),
      createdAt: new Date('2025-03-16T12:00:00.000Z')
    }]

    const result = getUtilisationRequestResponse(decimalRecord)

    expect(result[0]!.totalHours).toBe(37.5)
    expect(result[0]!.billableHours).toBe(25.25)
    expect(result[0]!.calculatedUtilisation).toBe(67.33)
  })
})