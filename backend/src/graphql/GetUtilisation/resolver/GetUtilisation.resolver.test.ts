import { GetUtilisationResolver } from './GetUtilisation.resolver'
import {
  getUtilisationRequest,
  getUtilisationRequestResponse,
} from '../../../services/index'
import { requireAuth } from '../../../utils/index'

jest.mock('../../../services/index')
jest.mock('../../../utils/index')

const mockGetUtilisationRequest = getUtilisationRequest as jest.MockedFunction<typeof getUtilisationRequest>
const mockGetUtilisationRequestResponse = getUtilisationRequestResponse as jest.MockedFunction<typeof getUtilisationRequestResponse>
const mockRequireAuth = requireAuth as jest.MockedFunction<typeof requireAuth>

describe('GetUtilisationResolver', () => {
  const mockClerkUser = {
    sub: 'user_123',
    privateMetadata: {}
  }

  const mockUtilisations = [
    {
      id: '1',
      userId: 'user_id_123',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      createdAt: new Date('2025-02-01')
    }
  ]

  const mockResponse = [
    {
      id: '1',
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-01-31T00:00:00.000Z',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      calculatedAt: '2025-02-01T00:00:00.000Z'
    }
  ]

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

  describe('Query.getUtilisation', () => {
    it('should successfully fetch utilisation data', async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockGetUtilisationRequest.mockResolvedValue(mockUtilisations)
      mockGetUtilisationRequestResponse.mockReturnValue(mockResponse)

      const result = await GetUtilisationResolver.Query.getUtilisation(
        {},
        {},
        mockContext
      )

      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext)
      expect(mockGetUtilisationRequest).toHaveBeenCalledWith('user_123')
      expect(mockGetUtilisationRequestResponse).toHaveBeenCalledWith(mockUtilisations)
      expect(result).toEqual(mockResponse)
    })

    it('should handle authentication errors', async () => {
      const authError = new Error('Authentication Failed')
      mockRequireAuth.mockRejectedValue(authError)

      await expect(
        GetUtilisationResolver.Query.getUtilisation({}, {}, mockContext)
      ).rejects.toThrow('Authentication Failed')

      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext)
      expect(mockGetUtilisationRequest).not.toHaveBeenCalled()
    })

    it('should handle service errors', async () => {
      const serviceError = new Error('User Not Found')
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockGetUtilisationRequest.mockRejectedValue(serviceError)

      await expect(
        GetUtilisationResolver.Query.getUtilisation({}, {}, mockContext)
      ).rejects.toThrow('User Not Found')

      expect(mockGetUtilisationRequest).toHaveBeenCalledWith('user_123')
      expect(mockGetUtilisationRequestResponse).not.toHaveBeenCalled()
    })

    it('should handle unexpected non-Error objects', async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockGetUtilisationRequest.mockRejectedValue('string error')

      await expect(
        GetUtilisationResolver.Query.getUtilisation({}, {}, mockContext)
      ).rejects.toThrow('An Unexpected Error Occurred While Fetching Utilisation Data')
    })
  })
})