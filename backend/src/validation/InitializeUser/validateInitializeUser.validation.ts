import { InitializeUserInput } from "../../types/index";
import {
  ensureClerkIdIsProvided,
  ensureClerkIdMatches,
  ensureCountryIsProvided,
  ensureCountryIsValidEnum,
  ensureFirstNameIsProvided,
  ensureFullNameIsProvided,
  ensureLastNameIsProvided,
} from "./validations/index";

const validateInitializeUserInput = (
  input: InitializeUserInput,
  authenticatedClerkId: string,
): void => {
  ensureClerkIdIsProvided(input.clerkId);
  ensureClerkIdMatches(authenticatedClerkId, input.clerkId);
  ensureFirstNameIsProvided(input.firstName);
  ensureLastNameIsProvided(input.lastName);
  ensureFullNameIsProvided(input.name);
  ensureCountryIsProvided(input.country);
  ensureCountryIsValidEnum(input.country);
};

export { validateInitializeUserInput };
