import { enUS, frFR } from "@clerk/localizations";

const clerkLocaleMap = {
  en: enUS,
  "en-GB": enUS,
  fr: frFR,
  "fr-FR": frFR,
};

export const getClerkLocalization = (language: string) => {
  return clerkLocaleMap[language as keyof typeof clerkLocaleMap] || enUS;
};
