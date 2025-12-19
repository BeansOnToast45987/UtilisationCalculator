import { ensureTargetUtilisationIsValid } from "./ensureTargetUtilisationIsValid.validation";

describe("ensureTargetUtilisationIsValid", () => {
  it("should pass with valid target utilisation values", () => {
    expect(() => ensureTargetUtilisationIsValid(1)).not.toThrow();
    expect(() => ensureTargetUtilisationIsValid(100)).not.toThrow();
    expect(() => ensureTargetUtilisationIsValid(75)).not.toThrow();
    expect(() => ensureTargetUtilisationIsValid(85.5)).not.toThrow();
    expect(() => ensureTargetUtilisationIsValid(67.33)).not.toThrow();
  });

  it("should throw error when target utilisation is required but missing", () => {
    expect(() => ensureTargetUtilisationIsValid(undefined as any)).toThrow(
      "Target Utilisation is Required",
    );
    expect(() => ensureTargetUtilisationIsValid(null as any)).toThrow(
      "Target Utilisation is Required",
    );
  });

  it("should throw error when target utilisation is not a number", () => {
    expect(() => ensureTargetUtilisationIsValid("75" as any)).toThrow(
      "Target Utilisation Must be a Number",
    );
    expect(() => ensureTargetUtilisationIsValid({} as any)).toThrow(
      "Target Utilisation Must be a Number",
    );
    expect(() => ensureTargetUtilisationIsValid([75] as any)).toThrow(
      "Target Utilisation Must be a Number",
    );
  });

  it("should throw error when target utilisation is below minimum", () => {
    expect(() => ensureTargetUtilisationIsValid(0)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
    expect(() => ensureTargetUtilisationIsValid(-1)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
    expect(() => ensureTargetUtilisationIsValid(0.5)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
  });

  it("should throw error when target utilisation is above maximum", () => {
    expect(() => ensureTargetUtilisationIsValid(101)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
    expect(() => ensureTargetUtilisationIsValid(100.1)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
    expect(() => ensureTargetUtilisationIsValid(150)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
  });

  it("should handle edge cases correctly", () => {
    expect(() => ensureTargetUtilisationIsValid(Infinity)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
    expect(() => ensureTargetUtilisationIsValid(-Infinity)).toThrow(
      "Target Utilisation Must be Between 1 and 100",
    );
  });
});
