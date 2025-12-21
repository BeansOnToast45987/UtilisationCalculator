import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  DeleteUtilisationInput,
  DeleteUtilisationResponse,
} from "../../types/index";

const DELETE_UTILISATION_MUTATION = gql`
  mutation DeleteUtilisation($input: DeleteUtilisationInput!) {
    deleteUtilisation(input: $input) {
      id
      message
    }
  }
`;

export const useDeleteUtilisation = () => {
  const [
    deleteUtilisationMutation,
    {
      data: deleteUtilisationData,
      loading: deleteUtilisationLoading,
      error: deleteUtilisationError,
      reset: resetDeleteUtilisation,
    },
  ] = useMutation<
    { deleteUtilisation: DeleteUtilisationResponse },
    { input: DeleteUtilisationInput }
  >(DELETE_UTILISATION_MUTATION);

  const deleteUtilisation = useCallback(
    async (deleteUtilisationInput: DeleteUtilisationInput) => {
      const { data } = await deleteUtilisationMutation({
        variables: { input: deleteUtilisationInput },
      });
      return data;
    },
    [deleteUtilisationMutation],
  );

  return {
    deleteUtilisation,
    deleteUtilisationData: deleteUtilisationData?.deleteUtilisation,
    deleteUtilisationLoading,
    deleteUtilisationError,
    resetDeleteUtilisation,
  };
};
