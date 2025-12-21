import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { InitializeUserInput, InitializeUserResponse } from "../../types/index";

const INITIALIZE_USER_MUTATION = gql`
  mutation InitializeUser($input: InitializeUserInput!) {
    initializeUser(input: $input) {
      user {
        id
        firstName
        lastName
        name
        clerkId
        country
      }
      created
      message
    }
  }
`;

export const useInitializeUser = () => {
  const [
    initializeUserMutation,
    {
      data: initializeUserData,
      loading: initializeUserLoading,
      error: initializeUserError,
    },
  ] = useMutation<
    { initializeUser: InitializeUserResponse },
    { input: InitializeUserInput }
  >(INITIALIZE_USER_MUTATION);

  const initializeUser = useCallback(
    async (initializeUserInput: InitializeUserInput) => {
      const { data } = await initializeUserMutation({
        variables: { input: initializeUserInput },
      });
      return data;
    },
    [initializeUserMutation],
  );

  return {
    initializeUser,
    initializeUserData: initializeUserData?.initializeUser,
    initializeUserLoading,
    initializeUserError,
  };
};
