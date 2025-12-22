import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

const localeMap = {
  en: enGB,
  "en-GB": enGB,
  fr: fr,
  "fr-FR": fr,
};

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const getDateFnsLocale = (language: string) => {
  return localeMap[language as keyof typeof localeMap] || enGB;
};

export const formatDateWithLocale = (
  date: Date,
  formatString: string,
  language: string,
): string => {
  if (!date || !isValidDate(date)) {
    return "Invalid date";
  }

  return format(date, formatString, {
    locale: getDateFnsLocale(language),
  });
};

export const formatDateWithTime = (
  dateInput: Date | string,
  language: string = "en",
): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (!isValidDate(date)) {
    return "Invalid date";
  }

  return formatDateWithLocale(date, "yyyy-MM-dd HH:mm:ss", language);
};

export const formatDate = (
  dateInput: Date | string,
  language: string = "en",
): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (!isValidDate(date)) {
    return "Invalid date";
  }

  return formatDateWithLocale(date, "dd/MM/yyyy", language);
};
