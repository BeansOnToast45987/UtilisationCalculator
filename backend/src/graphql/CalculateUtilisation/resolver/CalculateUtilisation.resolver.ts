import { CalculateUtilisationInput } from '../../../types/index'
import { validateCalculateUtilisationInput } from '../../../validation/index'
import {
  calculateUtilisationRequest,
  calculateUtilisationRequestResponse,
} from '../../../services/index'
import { requireAuth } from '../../../utils/index'

export const CalculateUtilisationResolver = {
  Mutation: {
    calculateUtilisation: async (
      _: any,
      { input }: { input: CalculateUtilisationInput },
      context: any
    ) => {
      try {
        validateCalculateUtilisationInput(input)

        const clerkUser = await requireAuth(context)

        const result = await calculateUtilisationRequest(input, clerkUser.sub)

        return calculateUtilisationRequestResponse(result)
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        throw new Error(
          'An Unexpected Error Occurred While Calculating Utilisation'
        )
      }
    },
  },

  Query: {
    _empty: () => 'This is a placeholder query',
  },
}
