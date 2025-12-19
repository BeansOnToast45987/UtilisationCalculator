import { DeleteUtilisationResolver } from './DeleteUtilisation.resolver'
import {
  deleteUtilisationRequest,
  deleteUtilisationRequestResponse,
} from '../../../services/index'
import { requireAuth } from '../../../utils/index'

jest.mock('../../../services/index')
jest.mock('../../../utils/index')

const mockDeleteUtilisationRequest = deleteUtilisationRequest as jest.MockedFunction<typeof deleteUtilisationRequest>
const mockDeleteUtilisationRequestResponse = deleteUtilisationRequestResponse as jest.MockedFunction<typeof deleteUtilisationRequestResponse>
const mockRequireAuth = requireAuth as jest.MockedFunction<typeof requireAuth>

describe('DeleteUtilisationResolver', () => {
  const mockInput = { id: 'calc_123' }
  const mockClerkUser = { sub: 'user_123', privateMetadata: {} }
  const mockResult = { id: 'calc_123' }
  const mockResponse = { id: 'calc_123', message: 'Calculation successfully deleted' }
  const mockContext = { request: { headers: { authorization: 'Bearer token' } } }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Mutation.deleteUtilisation', () => {
    it('should successfully delete utilisation calculation', async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockDeleteUtilisationRequest.mockResolvedValue(mockResult)
      mockDeleteUtilisationRequestResponse.mockReturnValue(mockResponse)

      const result = await DeleteUtilisationResolver.Mutation.deleteUtilisation(
        {},
        { input: mockInput },
        mockContext
      )

      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext)
      expect(mockDeleteUtilisationRequest).toHaveBeenCalledWith(mockInput, 'user_123')
      expect(mockDeleteUtilisationRequestResponse).toHaveBeenCalledWith(mockResult)
      expect(result).toEqual(mockResponse)
    })

    it('should handle authentication errors', async () => {
      mockRequireAuth.mockRejectedValue(new Error('Authentication Failed'))

      await expect(
        DeleteUtilisationResolver.Mutation.deleteUtilisation({}, { input: mockInput }, mockContext)
      ).rejects.toThrow('Authentication Failed')

      expect(mockDeleteUtilisationRequest).not.toHaveBeenCalled()
    })

    it('should handle service errors', async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockDeleteUtilisationRequest.mockRejectedValue(new Error('Calculation Not Found'))

      await expect(
        DeleteUtilisationResolver.Mutation.deleteUtilisation({}, { input: mockInput }, mockContext)
      ).rejects.toThrow('Calculation Not Found')
    })

    it('should handle unexpected errors', async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser)
      mockDeleteUtilisationRequest.mockRejectedValue('string error')

      await expect(
        DeleteUtilisationResolver.Mutation.deleteUtilisation({}, { input: mockInput }, mockContext)
      ).rejects.toThrow('An Unexpected Error Occurred While Deleting Utilisation')
    })
  })

  describe('Query._empty', () => {
    it('should return placeholder message', () => {
      const result = DeleteUtilisationResolver.Query._empty()
      expect(result).toBe('This is a placeholder query')
    })
  })
})