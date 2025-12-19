import { Country } from "../../../types/index";

const ensureCountryIsValidEnum = (trimmedCountry: string): void => {
  if (!Object.values(Country).includes(trimmedCountry as Country)) {
    throw new Error(
      `Invalid Country. Must be One of: ${Object.values(Country).join(", ")}`,
    );
  }
};

export { ensureCountryIsValidEnum };
