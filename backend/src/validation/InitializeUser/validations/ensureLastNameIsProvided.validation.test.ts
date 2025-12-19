import { ensureLastNameIsProvided } from "./ensureLastNameIsProvided.validation";

describe("ensureLastNameIsProvided", () => {
  it("should pass when lastName is provided", () => {
    expect(() => ensureLastNameIsProvided("Doe")).not.toThrow();
  });

  it("should pass when lastName has hyphen", () => {
    expect(() => ensureLastNameIsProvided("Smith-Jones")).not.toThrow();
  });

  it("should pass when lastName has apostrophe", () => {
    expect(() => ensureLastNameIsProvided("O'Connor")).not.toThrow();
  });

  it("should pass when lastName has accents", () => {
    expect(() => ensureLastNameIsProvided("García")).not.toThrow();
  });

  it("should pass when lastName has multiple words", () => {
    expect(() => ensureLastNameIsProvided("Van Der Berg")).not.toThrow();
  });

  it("should throw error when lastName is undefined", () => {
    expect(() => ensureLastNameIsProvided(undefined)).toThrow(
      "Last Name is Required",
    );
  });

  it("should throw error when lastName is null", () => {
    expect(() => ensureLastNameIsProvided(null)).toThrow(
      "Last Name is Required",
    );
  });

  it("should throw error when lastName is empty string", () => {
    expect(() => ensureLastNameIsProvided("")).toThrow("Last Name is Required");
  });

  it("should throw error when lastName is false", () => {
    expect(() => ensureLastNameIsProvided(false)).toThrow(
      "Last Name is Required",
    );
  });

  it("should pass when lastName is a single character", () => {
    expect(() => ensureLastNameIsProvided("D")).not.toThrow();
  });
});
