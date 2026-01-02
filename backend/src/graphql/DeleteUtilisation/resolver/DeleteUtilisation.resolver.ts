import { DeleteUtilisationInput } from "../../../types/index";
import {
  deleteUtilisationRequest,
  deleteUtilisationRequestResponse,
} from "../../../services/index";
import { requireAuth } from "../../../utils/index";

export const DeleteUtilisationResolver = {
  Mutation: {
    deleteUtilisation: async (
      _: any,
      { input }: { input: DeleteUtilisationInput },
      context: any,
    ) => {
      try {
        const clerkUser = await requireAuth(context);

        const result = await deleteUtilisationRequest(input, clerkUser.sub);

        return deleteUtilisationRequestResponse(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error(
          "An Unexpected Error Occurred While Deleting Utilisation",
        );
      }
    },
  },

  Query: {
    _empty: () => "This is a placeholder query",
  },
};
