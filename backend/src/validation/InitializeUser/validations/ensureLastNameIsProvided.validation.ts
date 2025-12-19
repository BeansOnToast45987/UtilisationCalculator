const ensureLastNameIsProvided = (lastName: any): void => {
  if (!lastName) {
    throw new Error("Last Name is Required");
  }
};

export { ensureLastNameIsProvided };
