import { gql } from "graphql-tag";

export const GetUtilisationTypeDefs = gql`
  type GetUtilisationResponse {
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

  extend type Query {
    getUtilisation: [GetUtilisationResponse!]!
  }
`;
