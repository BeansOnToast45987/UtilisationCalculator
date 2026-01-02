import { Country } from "../shared/country.types";

export interface InitializeUserInput {
  clerkId: string;
  firstName: string;
  lastName: string;
  name: string;
  country: Country;
}
