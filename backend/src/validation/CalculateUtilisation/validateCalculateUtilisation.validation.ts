import { CalculateUtilisationInput } from "../../types/index";
import {
  ensureBillableHoursIsValid,
  ensureDateRangeIsValid,
  ensureTargetUtilisationIsValid,
  ensureTotalHoursIsValid,
} from "./validations/index";

const validateCalculateUtilisationInput = (
  input: CalculateUtilisationInput,
): void => {
  ensureDateRangeIsValid(input.startDate, input.endDate);
  ensureTotalHoursIsValid(input.totalHours);
  ensureBillableHoursIsValid(input.billableHours, input.totalHours);
  ensureTargetUtilisationIsValid(input.targetUtilisation);
};

export { validateCalculateUtilisationInput };
