const ensureTotalHoursIsValid = (totalHours: number): void => {
  if (totalHours === undefined || totalHours === null) {
    throw new Error("Total Hours is Required");
  }

  if (typeof totalHours !== "number") {
    throw new Error("Total Hours Must be a Number");
  }

  if (totalHours <= 0) {
    throw new Error("Total Hours Must be Greater Than 0");
  }

  if (totalHours < 0.01) {
    throw new Error("Total Hours Must be at Least 0.01");
  }

  if (totalHours > 8760) {
    throw new Error("Total Hours Cannot Exceed 8760 (Hours in a Year)");
  }
};

export { ensureTotalHoursIsValid };
