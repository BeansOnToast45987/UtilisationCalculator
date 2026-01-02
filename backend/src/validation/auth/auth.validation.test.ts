import { validateAuthRequest } from "./auth.validation";
import {
  ensureAuthHeaderIsProvided,
  ensureSecretKeyIsConfigured,
  ensureTokenIsValid,
} from "./validations/index";

jest.mock("./validations/index");

const mockEnsureAuthHeaderIsProvided =
  ensureAuthHeaderIsProvided as jest.MockedFunction<
    typeof ensureAuthHeaderIsProvided
  >;
const mockEnsureSecretKeyIsConfigured =
  ensureSecretKeyIsConfigured as jest.MockedFunction<
    typeof ensureSecretKeyIsConfigured
  >;
const mockEnsureTokenIsValid = ensureTokenIsValid as jest.MockedFunction<
  typeof ensureTokenIsValid
>;

describe("validateAuthRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call all three validation functions", () => {
    mockEnsureAuthHeaderIsProvided.mockImplementation(() => {});
    mockEnsureTokenIsValid.mockImplementation(() => {});
    mockEnsureSecretKeyIsConfigured.mockImplementation(() => {});

    validateAuthRequest("Bearer token", "token", "secret");

    expect(mockEnsureAuthHeaderIsProvided).toHaveBeenCalledWith("Bearer token");
    expect(mockEnsureTokenIsValid).toHaveBeenCalledWith("token");
    expect(mockEnsureSecretKeyIsConfigured).toHaveBeenCalledWith("secret");
  });

  it("should throw error when validation fails", () => {
    mockEnsureAuthHeaderIsProvided.mockImplementation(() => {
      throw new Error("Authentication Required");
    });

    expect(() => validateAuthRequest(undefined, "token", "secret")).toThrow(
      "Authentication Required",
    );
  });
});
