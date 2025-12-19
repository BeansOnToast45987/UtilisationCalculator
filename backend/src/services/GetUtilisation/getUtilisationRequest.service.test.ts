import { getUtilisationRequest } from './getUtilisationRequest.service'

jest.mock('../../utils/index')

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
  },
  utilisationCalculation: {
    findMany: jest.fn(),
  },
} as any

(require('../../utils/index') as any).prisma = mockPrisma

describe('getUtilisationRequest', () => {
  const mockUser = {
    id: 'user_id_123',
    clerkId: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    country: 'GB',
    createdAt: new Date()
  }

  const mockCalculations = [
    {
      id: 'calc_1',
      userId: 'user_id_123',
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      createdAt: new Date('2025-02-01')
    },
    {
      id: 'calc_2',
      userId: 'user_id_123',
      totalHours: 80,
      billableHours: 40,
      targetUtilisation: 70,
      calculatedUtilisation: 50.0,
      meetsTarget: false,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-15'),
      createdAt: new Date('2025-02-16')
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully fetch user utilisation calculations', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)
    mockPrisma.utilisationCalculation.findMany.mockResolvedValue(mockCalculations)

    const result = await getUtilisationRequest('user_123')

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: 'user_123' }
    })
    expect(mockPrisma.utilisationCalculation.findMany).toHaveBeenCalledWith({
      where: { userId: 'user_id_123' },
      orderBy: { createdAt: 'desc' }
    })
    expect(result).toEqual(mockCalculations)
  })

  it('should throw error when user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null)

    await expect(
      getUtilisationRequest('nonexistent_user')
    ).rejects.toThrow('User Not Found')

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: 'nonexistent_user' }
    })
    expect(mockPrisma.utilisationCalculation.findMany).not.toHaveBeenCalled()
  })

  it('should return empty array when user has no calculations', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)
    mockPrisma.utilisationCalculation.findMany.mockResolvedValue([])

    const result = await getUtilisationRequest('user_123')

    expect(result).toEqual([])
  })

  it('should handle database errors', async () => {
    const dbError = new Error('Database connection failed')
    mockPrisma.user.findUnique.mockRejectedValue(dbError)

    await expect(
      getUtilisationRequest('user_123')
    ).rejects.toThrow('Database connection failed')
  })
})