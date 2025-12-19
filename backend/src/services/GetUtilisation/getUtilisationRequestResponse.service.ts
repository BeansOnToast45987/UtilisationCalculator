import { GetUtilisation, GetUtilisationResponse } from '../../types/index'

const getUtilisationRequestResponse = (
  results: GetUtilisation[]
): GetUtilisationResponse[] => {
  return results.map((result) => ({
    id: result.id,
    startDate: result.startDate.toISOString(),
    endDate: result.endDate.toISOString(),
    totalHours: result.totalHours,
    billableHours: result.billableHours,
    targetUtilisation: result.targetUtilisation,
    calculatedUtilisation: result.calculatedUtilisation,
    meetsTarget: result.meetsTarget,
    calculatedAt: result.createdAt.toISOString(),
  }))
}

export { getUtilisationRequestResponse }
