const ensureSecretKeyIsConfigured = (secretKey: string | undefined): void => {
  if (!secretKey || secretKey.trim() === "") {
    throw new Error("Server Configuration Error. Please Contact Support");
  }
};

export { ensureSecretKeyIsConfigured };
