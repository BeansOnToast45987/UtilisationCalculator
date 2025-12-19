const ensureClerkIdIsProvided = (clerkId: any): void => {
  if (!clerkId) {
    throw new Error("User Authentication ID is Required");
  }
};

export { ensureClerkIdIsProvided };
