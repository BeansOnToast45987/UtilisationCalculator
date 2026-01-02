import { vi } from "vitest";
import { getClerkLocalization } from "./clerkLocalizations";

vi.mock("@clerk/localizations", () => ({
  enUS: { mockLocale: "enUS" },
  frFR: { mockLocale: "frFR" },
}));

describe("clerkLocalizations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return enUS localization when language is 'en'", () => {
    const result = getClerkLocalization("en");

    expect(result).toEqual({ mockLocale: "enUS" });
  });

  it("should return enUS localization when language is 'en-GB'", () => {
    const result = getClerkLocalization("en-GB");

    expect(result).toEqual({ mockLocale: "enUS" });
  });

  it("should return frFR localization when language is 'fr'", () => {
    const result = getClerkLocalization("fr");

    expect(result).toEqual({ mockLocale: "frFR" });
  });

  it("should return frFR localization when language is 'fr-FR'", () => {
    const result = getClerkLocalization("fr-FR");

    expect(result).toEqual({ mockLocale: "frFR" });
  });

  it("should return enUS as fallback when language is unknown", () => {
    const result = getClerkLocalization("unknown-language");

    expect(result).toEqual({ mockLocale: "enUS" });
  });
});
