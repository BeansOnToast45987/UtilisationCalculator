export interface GetUtilisationResponse {
  id: string
  startDate: string
  endDate: string
  totalHours: number
  billableHours: number
  targetUtilisation: number
  calculatedUtilisation: number
  meetsTarget: boolean
  calculatedAt: string
}
