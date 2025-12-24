import { formatDate, formatDateWithTime, getDateFnsLocale, formatDateWithLocale } from "./dateFormatters";
import { enGB, fr } from "date-fns/locale";

describe("dateFormatters", () => {
  it("should format date in dd/MM/yyyy format when given a valid date input", () => {
    const date = new Date("2025-12-24T10:30:00Z");
    const result = formatDate(date, "en");
    expect(result).toBe("24/12/2025");
  });

  it("should format date with time in yyyy-MM-dd HH:mm:ss format when including time information", () => {
    const date = new Date("2025-12-24T10:30:00Z");
    const result = formatDateWithTime(date, "en");
    expect(result).toBe("2025-12-24 10:30:00");
  });

  it("should return 'Invalid date' when provided with invalid date inputs", () => {
    expect(formatDate("invalid-date", "en")).toBe("Invalid date");
    expect(formatDateWithTime(new Date("invalid"), "en")).toBe("Invalid date");
    expect(formatDateWithLocale(new Date("invalid"), "MMM dd, yyyy", "en")).toBe("Invalid date");
  });

  it("should return correct locale when different language codes are specified", () => {
    expect(getDateFnsLocale("en")).toBe(enGB);
    expect(getDateFnsLocale("fr")).toBe(fr);
    expect(getDateFnsLocale("unknown")).toBe(enGB);
  });

  it("should format date with custom format string when specific locale and format are provided", () => {
    const date = new Date("2025-12-24T10:30:00Z");
    const result = formatDateWithLocale(date, "MMM dd, yyyy", "en");
    expect(result).toBe("Dec 24, 2025");
  });
});
