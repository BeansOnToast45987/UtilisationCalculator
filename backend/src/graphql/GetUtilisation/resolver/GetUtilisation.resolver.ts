import {
  getUtilisationRequest,
  getUtilisationRequestResponse,
} from '../../../services/index'
import { requireAuth } from '../../../utils/index'

export const GetUtilisationResolver = {
  Query: {
    getUtilisation: async (_: any, __: any, context: any) => {
      try {
        const clerkUser = await requireAuth(context)

        const result = await getUtilisationRequest(clerkUser.sub)

        return getUtilisationRequestResponse(result)
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        throw new Error(
          'An Unexpected Error Occurred While Fetching Utilisation Data'
        )
      }
    },
  },
}
