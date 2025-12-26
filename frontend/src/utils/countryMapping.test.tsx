import {
  getCountryFromLanguage,
  isSupportedCountry,
  getCurrentUserCountry,
} from "./countryMapping";

describe("countryMapping", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return GB when language is 'en'", () => {
    const result = getCountryFromLanguage("en");
    const currentUserResult = getCurrentUserCountry("en");

    expect(result).toBe("GB");
    expect(currentUserResult).toBe("GB");
  });

  it("should normalize language and return FR when language is 'fr-FR'", () => {
    const result = getCountryFromLanguage("fr-FR");

    expect(result).toBe("FR");
  });

  it("should return GB as fallback when language is unsupported", () => {
    const result = getCountryFromLanguage("unknown-language");

    expect(result).toBe("GB");
  });

  it("should return true when checking supported countries", () => {
    expect(isSupportedCountry("GB")).toBe(true);
    expect(isSupportedCountry("FR")).toBe(true);
  });

  it("should return false when checking unsupported countries", () => {
    expect(isSupportedCountry("US")).toBe(false);
    expect(isSupportedCountry("UNKNOWN")).toBe(false);
    expect(isSupportedCountry("")).toBe(false);
  });
});
