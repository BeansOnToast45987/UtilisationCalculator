import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  CalculateUtilisationInput,
  CalculateUtilisationResponse,
} from "../../types/index";

const CALCULATE_UTILISATION_MUTATION = gql`
  mutation CalculateUtilisation($input: CalculateUtilisationInput!) {
    calculateUtilisation(input: $input) {
      id
      startDate
      endDate
      totalHours
      billableHours
      targetUtilisation
      calculatedUtilisation
      meetsTarget
      calculatedAt
    }
  }
`;

export const useCalculateUtilisation = () => {
  const [
    calculateUtilisationMutation,
    {
      data: calculateUtilisationData,
      loading: calculateUtilisationLoading,
      error: calculateUtilisationError,
      reset: resetCalculateUtilisation,
    },
  ] = useMutation<
    { calculateUtilisation: CalculateUtilisationResponse },
    { input: CalculateUtilisationInput }
  >(CALCULATE_UTILISATION_MUTATION);

  const calculateUtilisation = useCallback(
    async (calculateUtilisationInput: CalculateUtilisationInput) => {
      const { data } = await calculateUtilisationMutation({
        variables: { input: calculateUtilisationInput },
      });
      return data;
    },
    [calculateUtilisationMutation],
  );

  return {
    calculateUtilisation,
    calculateUtilisationData: calculateUtilisationData?.calculateUtilisation,
    calculateUtilisationLoading,
    calculateUtilisationError,
    resetCalculateUtilisation,
  };
};
