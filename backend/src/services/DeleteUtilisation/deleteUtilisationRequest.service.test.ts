import { deleteUtilisationRequest } from './deleteUtilisationRequest.service'

jest.mock('../../utils/index')

const mockPrisma = {
  user: { findUnique: jest.fn() },
  utilisationCalculation: { findUnique: jest.fn(), delete: jest.fn() },
} as any

(require('../../utils/index') as any).prisma = mockPrisma

describe('deleteUtilisationRequest', () => {
  const mockInput = { id: 'calc_123' }
  const mockUser = { id: 'user_id_123', clerkId: 'user_123' }
  const mockCalculation = { id: 'calc_123', userId: 'user_id_123' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully delete calculation', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)
    mockPrisma.utilisationCalculation.findUnique.mockResolvedValue(mockCalculation)
    mockPrisma.utilisationCalculation.delete.mockResolvedValue(mockCalculation)

    const result = await deleteUtilisationRequest(mockInput, 'user_123')

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { clerkId: 'user_123' } })
    expect(mockPrisma.utilisationCalculation.findUnique).toHaveBeenCalledWith({ where: { id: 'calc_123' } })
    expect(mockPrisma.utilisationCalculation.delete).toHaveBeenCalledWith({ where: { id: 'calc_123' } })
    expect(result).toEqual({ id: 'calc_123' })
  })

  it('should throw error when user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null)

    await expect(deleteUtilisationRequest(mockInput, 'user_123'))
      .rejects.toThrow('User Not Found')

    expect(mockPrisma.utilisationCalculation.findUnique).not.toHaveBeenCalled()
  })

  it('should throw error when calculation not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)
    mockPrisma.utilisationCalculation.findUnique.mockResolvedValue(null)

    await expect(deleteUtilisationRequest(mockInput, 'user_123'))
      .rejects.toThrow('Calculation Not Found')

    expect(mockPrisma.utilisationCalculation.delete).not.toHaveBeenCalled()
  })

  it('should throw error when user does not own calculation', async () => {
    const otherUserCalculation = { ...mockCalculation, userId: 'other_user_id' }
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)
    mockPrisma.utilisationCalculation.findUnique.mockResolvedValue(otherUserCalculation)

    await expect(deleteUtilisationRequest(mockInput, 'user_123'))
      .rejects.toThrow('You Do Not Own This Calculation')

    expect(mockPrisma.utilisationCalculation.delete).not.toHaveBeenCalled()
  })

  it('should handle database errors', async () => {
    mockPrisma.user.findUnique.mockRejectedValue(new Error('Database error'))

    await expect(deleteUtilisationRequest(mockInput, 'user_123'))
      .rejects.toThrow('Database error')
  })
})