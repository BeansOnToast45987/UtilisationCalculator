import {
  CalculateUtilisation,
  CalculateUtilisationResponse,
} from '../../types/index'

const calculateUtilisationRequestResponse = (
  result: CalculateUtilisation
): CalculateUtilisationResponse => {
  const meetsTarget = result.calculatedUtilisation >= result.targetUtilisation

  return {
    id: result.id,
    startDate: result.startDate.toISOString(),
    endDate: result.endDate.toISOString(),
    totalHours: result.totalHours,
    billableHours: result.billableHours,
    targetUtilisation: result.targetUtilisation,
    calculatedUtilisation: result.calculatedUtilisation,
    meetsTarget,
    calculatedAt: result.createdAt.toISOString(),
  }
}

export { calculateUtilisationRequestResponse }
