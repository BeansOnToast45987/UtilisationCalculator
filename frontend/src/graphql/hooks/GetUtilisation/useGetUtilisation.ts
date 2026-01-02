import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { GetUtilisationResponse } from "../../types/index";

const GET_UTILISATION_QUERY = gql`
  query GetUtilisation {
    getUtilisation {
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

export const useGetUtilisation = () => {
  const {
    data: getUtilisationData,
    loading: getUtilisationLoading,
    error: getUtilisationError,
    refetch: refetchGetUtilisation,
  } = useQuery<{ getUtilisation: GetUtilisationResponse[] }>(
    GET_UTILISATION_QUERY,
  );

  const getUtilisation = useCallback(async () => {
    const { data } = await refetchGetUtilisation();
    return data;
  }, [refetchGetUtilisation]);

  return {
    getUtilisation,
    getUtilisationData: getUtilisationData?.getUtilisation,
    getUtilisationLoading,
    getUtilisationError,
    refetchGetUtilisation,
  };
};
