export const LANGUAGE_TO_COUNTRY_MAP = {
  en: "GB",
  fr: "FR",
} as const;

export type SupportedLanguage = keyof typeof LANGUAGE_TO_COUNTRY_MAP;
export type SupportedCountry =
  (typeof LANGUAGE_TO_COUNTRY_MAP)[SupportedLanguage];

export function getCountryFromLanguage(language: string): SupportedCountry {
  const normalizedLanguage = language.toLowerCase().split("-")[0];
  return (
    LANGUAGE_TO_COUNTRY_MAP[normalizedLanguage as SupportedLanguage] || "GB"
  );
}

export function isSupportedCountry(
  country: string,
): country is SupportedCountry {
  return Object.values(LANGUAGE_TO_COUNTRY_MAP).includes(
    country as SupportedCountry,
  );
}

export function getCurrentUserCountry(
  currentLanguage: string,
): SupportedCountry {
  return getCountryFromLanguage(currentLanguage);
}
