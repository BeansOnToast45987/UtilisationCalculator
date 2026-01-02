import { gql } from "graphql-tag";

export const DeleteUtilisationTypeDefs = gql`
  input DeleteUtilisationInput {
    id: String!
  }

  type DeleteUtilisationResponse {
    id: String!
    message: String!
  }

  extend type Mutation {
    deleteUtilisation(
      input: DeleteUtilisationInput!
    ): DeleteUtilisationResponse!
  }
`;
