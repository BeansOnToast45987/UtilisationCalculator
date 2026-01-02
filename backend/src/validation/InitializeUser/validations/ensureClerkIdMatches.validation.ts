const ensureClerkIdMatches = (
  authenticatedClerkId: string,
  inputClerkId: string,
): void => {
  if (authenticatedClerkId !== inputClerkId) {
    throw new Error("Cannot Initialize User for Different Clerk ID");
  }
};

export { ensureClerkIdMatches };
