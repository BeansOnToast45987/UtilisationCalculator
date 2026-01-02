export interface CalculateUtilisation {
  id: string;
  userId: string;
  totalHours: number;
  billableHours: number;
  targetUtilisation: number;
  calculatedUtilisation: number;
  meetsTarget: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface CalculateUtilisationResponse {
  id: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  billableHours: number;
  targetUtilisation: number;
  calculatedUtilisation: number;
  meetsTarget: boolean;
  calculatedAt: string;
}
