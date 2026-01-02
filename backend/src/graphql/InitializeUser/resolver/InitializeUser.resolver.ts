import { InitializeUserInput } from "../../../types/index";
import { validateInitializeUserInput } from "../../../validation/index";
import {
  initializeUserRequest,
  initializeUserRequestResponse,
} from "../../../services/index";
import { requireAuth } from "../../../utils/index";

export const InitializeUserResolver = {
  Mutation: {
    initializeUser: async (
      _: any,
      { input }: { input: InitializeUserInput },
      context: any,
    ) => {
      try {
        const clerkUser = await requireAuth(context);

        validateInitializeUserInput(input, clerkUser.sub);
        const result = await initializeUserRequest(input);

        const message = result.created
          ? "User Successfully Created"
          : "User Already Exists";

        return initializeUserRequestResponse(result, message);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An Unexpected Error Occurred While Initializing User");
      }
    },
  },

  Query: {
    _empty: () => "This is a placeholder query",
  },
};
