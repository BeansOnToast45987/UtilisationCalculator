import { prisma } from '../../utils/index'
import { GetUtilisation } from '../../types/index'

const getUtilisationRequest = async (
  clerkId: string
): Promise<GetUtilisation[]> => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!user) {
    throw new Error('User Not Found')
  }

  const calculations = await prisma.utilisationCalculation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  const results: GetUtilisation[] = calculations.map((calculation) => ({
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
  }))

  return results
}

export { getUtilisationRequest }
