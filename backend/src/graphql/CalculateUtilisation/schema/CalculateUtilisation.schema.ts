import { gql } from "graphql-tag";

export const CalculateUtilisationTypeDefs = gql`
  input CalculateUtilisationInput {
    startDate: String!
    endDate: String!
    totalHours: Float!
    billableHours: Float!
    targetUtilisation: Float!
  }

  type CalculateUtilisationResponse {
    id: String!
    startDate: String!
    endDate: String!
    totalHours: Float!
    billableHours: Float!
    targetUtilisation: Float!
    calculatedUtilisation: Float!
    meetsTarget: Boolean!
    calculatedAt: String!
  }

  extend type Mutation {
    calculateUtilisation(
      input: CalculateUtilisationInput!
    ): CalculateUtilisationResponse!
  }
`;
