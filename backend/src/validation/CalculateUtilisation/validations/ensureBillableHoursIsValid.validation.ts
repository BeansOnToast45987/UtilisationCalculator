const ensureBillableHoursIsValid = (
  billableHours: number,
  totalHours: number,
): void => {
  if (billableHours === undefined || billableHours === null) {
    throw new Error("Billable Hours is Required");
  }

  if (typeof billableHours !== "number") {
    throw new Error("Billable Hours Must be a Number");
  }

  if (billableHours < 0) {
    throw new Error("Billable Hours Cannot be Negative");
  }

  if (billableHours > 0 && billableHours < 0.01) {
    throw new Error("Billable Hours Must be 0 or at Least 0.01");
  }

  if (billableHours > totalHours) {
    throw new Error("Billable Hours Cannot Exceed Total Hours");
  }
};

export { ensureBillableHoursIsValid };
