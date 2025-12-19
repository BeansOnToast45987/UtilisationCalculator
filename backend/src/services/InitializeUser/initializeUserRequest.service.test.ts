import { initializeUserRequest } from './initializeUserRequest.service'
import { Country } from '../../types/index'

jest.mock('../../utils/index')

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
} as any

(require('../../utils/index') as any).prisma = mockPrisma

describe('initializeUserRequest', () => {
  const mockInput = {
    clerkId: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    country: Country.GB
  }

  const mockUser = {
    id: '1',
    clerkId: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    country: Country.GB,
    createdAt: new Date(),
    utilisationCalculations: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new user when user does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null)
    mockPrisma.user.create.mockResolvedValue(mockUser)

    const result = await initializeUserRequest(mockInput)

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: 'user_123' }
    })
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: mockInput
    })
    expect(result).toEqual({
      user: mockUser,
      created: true
    })
  })

  it('should return existing user when user already exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser)

    const result = await initializeUserRequest(mockInput)

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: 'user_123' }
    })
    expect(mockPrisma.user.create).not.toHaveBeenCalled()
    expect(result).toEqual({
      user: mockUser,
      created: false
    })
  })

  it('should handle race condition when unique constraint fails', async () => {
    const uniqueConstraintError = {
      code: 'P2002',
      meta: { target: ['clerkId'] }
    }

    mockPrisma.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockUser)
    mockPrisma.user.create.mockRejectedValue(uniqueConstraintError)

    const result = await initializeUserRequest(mockInput)

    expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(2)
    expect(mockPrisma.user.create).toHaveBeenCalled()
    expect(result).toEqual({
      user: mockUser,
      created: false
    })
  })

  it('should throw error when race condition occurs but user still not found', async () => {
    const uniqueConstraintError = {
      code: 'P2002',
      meta: { target: ['clerkId'] }
    }

    mockPrisma.user.findUnique
      .mockResolvedValueOnce(null) 
      .mockResolvedValueOnce(null)
    mockPrisma.user.create.mockRejectedValue(uniqueConstraintError)

    await expect(initializeUserRequest(mockInput))
      .rejects.toEqual(uniqueConstraintError)
  })

  it('should throw error for non-unique constraint database errors', async () => {
    const databaseError = {
      code: 'P2001',
      message: 'Database connection error'
    }

    mockPrisma.user.findUnique.mockResolvedValue(null)
    mockPrisma.user.create.mockRejectedValue(databaseError)

    await expect(initializeUserRequest(mockInput))
      .rejects.toEqual(databaseError)
  })

  it('should handle different country values', async () => {
    const frenchInput = { ...mockInput, country: Country.FR }
    const frenchUser = { ...mockUser, country: Country.FR }

    mockPrisma.user.findUnique.mockResolvedValue(null)
    mockPrisma.user.create.mockResolvedValue(frenchUser)

    const result = await initializeUserRequest(frenchInput)

    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: frenchInput
    })
    expect(result.user.country).toBe(Country.FR)
  })
})