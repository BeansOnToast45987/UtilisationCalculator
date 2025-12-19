import {
  ensureAuthHeaderIsProvided,
  ensureSecretKeyIsConfigured,
  ensureTokenIsValid,
} from "./validations/index";

const validateAuthRequest = (
  authHeader: string | undefined,
  token: string,
  secretKey: string | undefined,
): void => {
  ensureAuthHeaderIsProvided(authHeader);
  ensureTokenIsValid(token);
  ensureSecretKeyIsConfigured(secretKey);
};

export { validateAuthRequest };
