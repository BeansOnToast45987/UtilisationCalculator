import {
  GetUtilisationResponse,
  DeleteUtilisationInput,
} from "../../../../graphql/types/index";

export interface UtilisationHistoryOrganismProps {
  getUtilisationData: GetUtilisationResponse[] | undefined;
  getUtilisationLoading: boolean;
  getUtilisationError: Error | undefined;
  deleteUtilisation: (input: DeleteUtilisationInput) => Promise<any>;
  refetchGetUtilisation: () => Promise<any>;
  deleteUtilisationLoading: boolean;
  deleteUtilisationError: Error | undefined;
  resetDeleteUtilisation: () => void;
}
