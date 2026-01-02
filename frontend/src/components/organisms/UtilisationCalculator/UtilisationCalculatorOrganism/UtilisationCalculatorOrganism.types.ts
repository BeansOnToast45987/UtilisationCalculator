import {
  CalculateUtilisationInput,
  CalculateUtilisationResponse,
} from "../../../../graphql/types/index";

export interface CalculateUtilisationFormData {
  startDate: Date | null;
  endDate: Date | null;
  totalHours: number | string;
  billableHours: number | string;
  targetUtilisation: number | string;
}

export interface UtilisationCalculatorOrganismProps {
  onSubmit: (input: CalculateUtilisationInput) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
  onClose: () => void;
}

export interface UtilisationCalculatorResultOrganismProps {
  data?: CalculateUtilisationResponse;
  onClose: () => void;
}
