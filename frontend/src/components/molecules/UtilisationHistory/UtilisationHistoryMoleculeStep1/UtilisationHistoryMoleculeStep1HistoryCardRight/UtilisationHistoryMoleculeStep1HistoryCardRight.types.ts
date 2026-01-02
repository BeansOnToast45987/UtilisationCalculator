export interface UtilisationHistoryMoleculeStep1HistoryCardRightProps {
  id: string;
  startDate: string;
  endDate: string;
  billableHours: number;
  totalHours: number;
  onDelete: (id: string) => void;
}
