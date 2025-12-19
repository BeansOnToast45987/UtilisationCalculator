import { CalculateUtilisationResolver } from './CalculateUtilisation.resolver'
import { validateCalculateUtilisationInput } from '../../../validation/index'
import {
  calculateUtilisationRequest,
  calculateUtilisationRequestResponse,
} from '../../../services/index'
import { requireAuth } from '../../../utils/index'

jest.mock('../../../validation/index')
jest.mock('../../../services/index')
jest.mock('../../../utils/index')

const mockValidateCalculateUtilisationInput = validateCalculateUtilisationInput as jest.MockedFunction<typeof validateCalculateUtilisationInput>
const mockCalculateUtilisationRequest = calculateUtilisationRequest as jest.MockedFunction<typeof calculateUtilisationRequest>
const mockCalculateUtilisationRequestResponse = calculateUtilisationRequestResponse as jest.MockedFunction<typeof calculateUtilisationRequestResponse>
const mockRequireAuth = requireAuth as jest.MockedFunction<typeof requireAuth>

describe('CalculateUtilisationResolver', () => {
  const mockInput = {
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75
  }

  const mockClerkUser = {
    sub: 'user_123',
    privateMetadata: {}
  }

  const mockCalculation = {
    id: '1',
    userId: 'user_id_123',
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75,
    calculatedUtilisation: 75.0,
    meetsTarget: true,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    createdAt: new Date()
  }

  const mockResponse = {
    id: '1',
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-01-31T00:00:00.000Z',
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75,
    calculatedUtilisation: 75.0,
    meetsTarget: true,
    calculatedAt: new Date().toISOString()
  }

  const mockContext = {
    request: {
      headers: {
        authorization: 'Bearer valid_token'
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Mutation.calculateUtilisation', () => {
    it('should successfully calculate utilisation', async () => {
      mockValidateCalculateUtilisationInput.mockImplementation(() => {})
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockCalculateUtilisationRequest.mockResolvedValue(mockCalculation)
      mockCalculateUtilisationRequestResponse.mockReturnValue(mockResponse)

      const result = await CalculateUtilisationResolver.Mutation.calculateUtilisation(
        {},
        { input: mockInput },
        mockContext
      )

      expect(mockValidateCalculateUtilisationInput).toHaveBeenCalledWith(mockInput)
      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext)
      expect(mockCalculateUtilisationRequest).toHaveBeenCalledWith(mockInput, 'user_123')
      expect(mockCalculateUtilisationRequestResponse).toHaveBeenCalledWith(mockCalculation)
      expect(result).toEqual(mockResponse)
    })

    it('should handle validation errors', async () => {
      const validationError = new Error('Total Hours Must be Greater Than 0')
      mockValidateCalculateUtilisationInput.mockImplementation(() => {
        throw validationError
      })

      await expect(
        CalculateUtilisationResolver.Mutation.calculateUtilisation(
          {},
          { input: mockInput },
          mockContext
        )
      ).rejects.toThrow('Total Hours Must be Greater Than 0')

      expect(mockValidateCalculateUtilisationInput).toHaveBeenCalledWith(mockInput)
      expect(mockRequireAuth).not.toHaveBeenCalled()
    })

    it('should handle authentication errors', async () => {
      const authError = new Error('Authentication Failed')
      mockValidateCalculateUtilisationInput.mockImplementation(() => {})
      mockRequireAuth.mockRejectedValue(authError)

      await expect(
        CalculateUtilisationResolver.Mutation.calculateUtilisation(
          {},
          { input: mockInput },
          mockContext
        )
      ).rejects.toThrow('Authentication Failed')

      expect(mockValidateCalculateUtilisationInput).toHaveBeenCalledWith(mockInput)
      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext)
      expect(mockCalculateUtilisationRequest).not.toHaveBeenCalled()
    })

    it('should handle service errors', async () => {
      const serviceError = new Error('User Not Found')
      mockValidateCalculateUtilisationInput.mockImplementation(() => {})
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockCalculateUtilisationRequest.mockRejectedValue(serviceError)

      await expect(
        CalculateUtilisationResolver.Mutation.calculateUtilisation(
          {},
          { input: mockInput },
          mockContext
        )
      ).rejects.toThrow('User Not Found')

      expect(mockCalculateUtilisationRequest).toHaveBeenCalledWith(mockInput, 'user_123')
      expect(mockCalculateUtilisationRequestResponse).not.toHaveBeenCalled()
    })

    it('should handle unexpected non-Error objects', async () => {
      mockValidateCalculateUtilisationInput.mockImplementation(() => {})
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockCalculateUtilisationRequest.mockRejectedValue('string error')

      await expect(
        CalculateUtilisationResolver.Mutation.calculateUtilisation(
          {},
          { input: mockInput },
          mockContext
        )
      ).rejects.toThrow('An Unexpected Error Occurred While Calculating Utilisation')
    })
  })

  describe('Query._empty', () => {
    it('should return placeholder message', () => {
      const result = CalculateUtilisationResolver.Query._empty()
      expect(result).toBe('This is a placeholder query')
    })
  })
})