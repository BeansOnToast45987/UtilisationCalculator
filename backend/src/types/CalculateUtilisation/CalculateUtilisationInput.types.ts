export interface CalculateUtilisationInput {
  startDate: string
  endDate: string
  totalHours: number
  billableHours: number
  targetUtilisation: number
}
