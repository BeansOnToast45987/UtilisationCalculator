import { deleteUtilisationRequestResponse } from './deleteUtilisationRequestResponse.service'

describe('deleteUtilisationRequestResponse', () => {
  it('should format successful deletion response', () => {
    const mockResult = { id: 'calc_123' }

    const result = deleteUtilisationRequestResponse(mockResult)

    expect(result).toEqual({
      id: 'calc_123',
      message: 'Calculation successfully deleted'
    })
  })

  it('should handle different calculation IDs', () => {
    const mockResult = { id: 'different_calc_456' }

    const result = deleteUtilisationRequestResponse(mockResult)

    expect(result.id).toBe('different_calc_456')
    expect(result.message).toBe('Calculation successfully deleted')
  })

  it('should always return consistent message', () => {
    const result1 = deleteUtilisationRequestResponse({ id: 'calc_1' })
    const result2 = deleteUtilisationRequestResponse({ id: 'calc_2' })

    expect(result1.message).toBe('Calculation successfully deleted')
    expect(result2.message).toBe('Calculation successfully deleted')
    expect(result1.message).toBe(result2.message)
  })

  it('should preserve the input id exactly', () => {
    const complexId = 'calc_123_complex_id_456_789'
    const result = deleteUtilisationRequestResponse({ id: complexId })

    expect(result.id).toBe(complexId)
  })

  it('should return object with correct structure', () => {
    const result = deleteUtilisationRequestResponse({ id: 'test_id' })

    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('message')
    expect(Object.keys(result)).toHaveLength(2)
  })
})