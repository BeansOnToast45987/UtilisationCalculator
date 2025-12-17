import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    utilisationCalculation: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $transaction: jest.fn(),
  }))
}))

describe('Prisma Utils', () => {
  let mockPrismaClient: any
  let prisma: any

  beforeEach(() => {
    jest.resetModules()
    
    prisma = require('./prisma.utils').prisma
    mockPrismaClient = prisma
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Prisma Client Instance', () => {
    it('should export prisma client instance', () => {
      expect(prisma).toBeDefined()
      expect(typeof prisma).toBe('object')
    })

    it('should have user model with CRUD methods', () => {
      expect(prisma.user).toBeDefined()
      expect(typeof prisma.user.findUnique).toBe('function')
      expect(typeof prisma.user.findMany).toBe('function')
      expect(typeof prisma.user.create).toBe('function')
      expect(typeof prisma.user.update).toBe('function')
      expect(typeof prisma.user.delete).toBe('function')
    })

    it('should have utilisationCalculation model with CRUD methods', () => {
      expect(prisma.utilisationCalculation).toBeDefined()
      expect(typeof prisma.utilisationCalculation.findUnique).toBe('function')
      expect(typeof prisma.utilisationCalculation.findMany).toBe('function')
      expect(typeof prisma.utilisationCalculation.create).toBe('function')
      expect(typeof prisma.utilisationCalculation.update).toBe('function')
      expect(typeof prisma.utilisationCalculation.delete).toBe('function')
    })

    it('should have connection methods', () => {
      expect(typeof prisma.$connect).toBe('function')
      expect(typeof prisma.$disconnect).toBe('function')
      expect(typeof prisma.$transaction).toBe('function')
    })
  })

  describe('User Model Operations', () => {
    it('should call findUnique with correct parameters', async () => {
      const mockUser = { id: '1', name: 'Test User' }
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser)

      const result = await prisma.user.findUnique({ where: { id: '1' } })

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
      expect(result).toEqual(mockUser)
    })

    it('should call create with correct parameters', async () => {
      const userData = {
        clerkId: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        country: 'GB'
      }
      const mockCreatedUser = { id: '1', ...userData }
      mockPrismaClient.user.create.mockResolvedValue(mockCreatedUser)

      const result = await prisma.user.create({ data: userData })

      expect(prisma.user.create).toHaveBeenCalledWith({ data: userData })
      expect(result).toEqual(mockCreatedUser)
    })
  })

  describe('UtilisationCalculation Model Operations', () => {
    it('should call findMany with correct parameters', async () => {
      const mockCalculations = [
        { id: '1', userId: 'user_1', totalHours: 40, billableHours: 35 }
      ]
      mockPrismaClient.utilisationCalculation.findMany.mockResolvedValue(mockCalculations)

      const result = await prisma.utilisationCalculation.findMany({
        where: { userId: 'user_1' }
      })

      expect(prisma.utilisationCalculation.findMany).toHaveBeenCalledWith({
        where: { userId: 'user_1' }
      })
      expect(result).toEqual(mockCalculations)
    })

    it('should call create with correct calculation data', async () => {
      const calculationData = {
        userId: 'user_1',
        totalHours: 40,
        billableHours: 35,
        targetUtilisation: 0.85,
        calculatedUtilisation: 0.875,
        meetsTarget: true,
        startDate: new Date(),
        endDate: new Date()
      }
      const mockCreatedCalculation = { id: '1', ...calculationData }
      mockPrismaClient.utilisationCalculation.create.mockResolvedValue(mockCreatedCalculation)

      const result = await prisma.utilisationCalculation.create({ data: calculationData })

      expect(prisma.utilisationCalculation.create).toHaveBeenCalledWith({ data: calculationData })
      expect(result).toEqual(mockCreatedCalculation)
    })
  })

  describe('Connection Management', () => {
    it('should call $connect method', async () => {
      mockPrismaClient.$connect.mockResolvedValue(undefined)

      await prisma.$connect()

      expect(prisma.$connect).toHaveBeenCalled()
    })

    it('should call $disconnect method', async () => {
      mockPrismaClient.$disconnect.mockResolvedValue(undefined)

      await prisma.$disconnect()

      expect(prisma.$disconnect).toHaveBeenCalled()
    })

    it('should handle transaction operations', async () => {
      const mockTransactionResult = { success: true }
      mockPrismaClient.$transaction.mockResolvedValue(mockTransactionResult)

      const transactionCallback = jest.fn()
      const result = await prisma.$transaction(transactionCallback)

      expect(prisma.$transaction).toHaveBeenCalledWith(transactionCallback)
      expect(result).toEqual(mockTransactionResult)
    })
  })

  describe('Environment Handling', () => {
    it('should handle production environment correctly', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      jest.resetModules()
      const prodPrisma = require('./prisma.utils').prisma
      
      expect(prodPrisma).toBeDefined()

      process.env.NODE_ENV = originalEnv
    })

    it('should handle development environment correctly', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      jest.resetModules()
      const devPrisma = require('./prisma.utils').prisma
      
      expect(devPrisma).toBeDefined()

      process.env.NODE_ENV = originalEnv
    })
  })
})