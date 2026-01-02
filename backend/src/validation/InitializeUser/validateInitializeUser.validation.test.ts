import { validateInitializeUserInput } from "./validateInitializeUser.validation";
import {
  ensureClerkIdIsProvided,
  ensureClerkIdMatches,
  ensureCountryIsProvided,
  ensureCountryIsValidEnum,
  ensureFirstNameIsProvided,
  ensureFullNameIsProvided,
  ensureLastNameIsProvided,
} from "./validations/index";
import { Country } from "../../types/index";

jest.mock("./validations/index");

const mockEnsureClerkIdIsProvided =
  ensureClerkIdIsProvided as jest.MockedFunction<
    typeof ensureClerkIdIsProvided
  >;
const mockEnsureClerkIdMatches = ensureClerkIdMatches as jest.MockedFunction<
  typeof ensureClerkIdMatches
>;
const mockEnsureCountryIsProvided =
  ensureCountryIsProvided as jest.MockedFunction<
    typeof ensureCountryIsProvided
  >;
const mockEnsureCountryIsValidEnum =
  ensureCountryIsValidEnum as jest.MockedFunction<
    typeof ensureCountryIsValidEnum
  >;
const mockEnsureFirstNameIsProvided =
  ensureFirstNameIsProvided as jest.MockedFunction<
    typeof ensureFirstNameIsProvided
  >;
const mockEnsureFullNameIsProvided =
  ensureFullNameIsProvided as jest.MockedFunction<
    typeof ensureFullNameIsProvided
  >;
const mockEnsureLastNameIsProvided =
  ensureLastNameIsProvided as jest.MockedFunction<
    typeof ensureLastNameIsProvided
  >;

describe("validateInitializeUserInput", () => {
  const mockInput = {
    clerkId: "user_123",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    country: Country.GB,
  };
  const authenticatedClerkId = "user_123";

  beforeEach(() => {
    jest.clearAllMocks();
    mockEnsureClerkIdIsProvided.mockImplementation(() => {});
    mockEnsureClerkIdMatches.mockImplementation(() => {});
    mockEnsureFirstNameIsProvided.mockImplementation(() => {});
    mockEnsureLastNameIsProvided.mockImplementation(() => {});
    mockEnsureFullNameIsProvided.mockImplementation(() => {});
    mockEnsureCountryIsProvided.mockImplementation(() => {});
    mockEnsureCountryIsValidEnum.mockImplementation(() => {});
  });

  it("should call all validation functions with correct parameters", () => {
    validateInitializeUserInput(mockInput, authenticatedClerkId);

    expect(mockEnsureClerkIdIsProvided).toHaveBeenCalledWith("user_123");
    expect(mockEnsureClerkIdMatches).toHaveBeenCalledWith(
      "user_123",
      "user_123",
    );
    expect(mockEnsureFirstNameIsProvided).toHaveBeenCalledWith("John");
    expect(mockEnsureLastNameIsProvided).toHaveBeenCalledWith("Doe");
    expect(mockEnsureFullNameIsProvided).toHaveBeenCalledWith("John Doe");
    expect(mockEnsureCountryIsProvided).toHaveBeenCalledWith(Country.GB);
    expect(mockEnsureCountryIsValidEnum).toHaveBeenCalledWith(Country.GB);
  });

  it("should throw error when clerkId validation fails", () => {
    mockEnsureClerkIdIsProvided.mockImplementation(() => {
      throw new Error("User Authentication ID is Required");
    });

    expect(() =>
      validateInitializeUserInput(mockInput, authenticatedClerkId),
    ).toThrow("User Authentication ID is Required");
  });

  it("should throw error when validation fails and stop at first error", () => {
    mockEnsureFirstNameIsProvided.mockImplementation(() => {
      throw new Error("First Name is Required");
    });

    expect(() =>
      validateInitializeUserInput(mockInput, authenticatedClerkId),
    ).toThrow("First Name is Required");

    expect(mockEnsureLastNameIsProvided).not.toHaveBeenCalled();
  });

  it("should not return anything when all validations pass", () => {
    const result = validateInitializeUserInput(mockInput, authenticatedClerkId);
    expect(result).toBeUndefined();
  });
});
