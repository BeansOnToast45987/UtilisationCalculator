import { prisma } from '../../utils/index'
import {
  CalculateUtilisationInput,
  CalculateUtilisation,
} from '../../types/index'

const calculateUtilisationRequest = async (
  input: CalculateUtilisationInput,
  clerkId: string
): Promise<CalculateUtilisation> => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!user) {
    throw new Error('User Not Found')
  }

  if (input.totalHours === 0) {
    throw new Error('Total Hours Cannot be Zero')
  }

  const calculatedUtilisation =
    Math.round((input.billableHours / input.totalHours) * 100 * 100) / 100

  if (!Number.isFinite(calculatedUtilisation)) {
    throw new Error('Calculated Utilisation is Not a Valid Number')
  }

  const meetsTarget = calculatedUtilisation >= input.targetUtilisation

  const calculation = await prisma.utilisationCalculation.create({
    data: {
      userId: user.id,
      totalHours: input.totalHours,
      billableHours: input.billableHours,
      targetUtilisation: input.targetUtilisation,
      calculatedUtilisation,
      meetsTarget,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
    },
  })

  const result: CalculateUtilisation = {
    id: calculation.id,
    userId: calculation.userId,
    totalHours: calculation.totalHours,
    billableHours: calculation.billableHours,
    targetUtilisation: calculation.targetUtilisation,
    calculatedUtilisation: calculation.calculatedUtilisation,
    meetsTarget: calculation.meetsTarget,
    startDate: calculation.startDate,
    endDate: calculation.endDate,
    createdAt: calculation.createdAt,
  }

  return result
}

export { calculateUtilisationRequest }
