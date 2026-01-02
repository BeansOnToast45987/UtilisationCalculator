import { InitializeUserResolver } from "./InitializeUser.resolver";
import { validateInitializeUserInput } from "../../../validation/index";
import {
  initializeUserRequest,
  initializeUserRequestResponse,
} from "../../../services/index";
import { requireAuth } from "../../../utils/index";
import { Country } from "../../../types/index";

jest.mock("../../../validation/index");
jest.mock("../../../services/index");
jest.mock("../../../utils/index");

const mockValidateInitializeUserInput =
  validateInitializeUserInput as jest.MockedFunction<
    typeof validateInitializeUserInput
  >;
const mockInitializeUserRequest = initializeUserRequest as jest.MockedFunction<
  typeof initializeUserRequest
>;
const mockInitializeUserRequestResponse =
  initializeUserRequestResponse as jest.MockedFunction<
    typeof initializeUserRequestResponse
  >;
const mockRequireAuth = requireAuth as jest.MockedFunction<typeof requireAuth>;

describe("InitializeUserResolver", () => {
  const mockInput = {
    clerkId: "user_123",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    country: Country.GB,
  };

  const mockClerkUser = {
    sub: "user_123",
    privateMetadata: {},
  };

  const mockUser = {
    id: "1",
    clerkId: "user_123",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    country: Country.GB,
    createdAt: new Date(),
    utilisationCalculations: [],
  };

  const mockContext = {
    headers: {
      authorization: "Bearer valid-token",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Mutation.initializeUser", () => {
    it("should successfully create a new user", async () => {
      const mockResult = { user: mockUser, created: true };
      const mockResponse = {
        user: mockUser,
        created: true,
        message: "User Successfully Created",
      };

      mockRequireAuth.mockResolvedValue(mockClerkUser);
      mockValidateInitializeUserInput.mockImplementation(() => {});
      mockInitializeUserRequest.mockResolvedValue(mockResult);
      mockInitializeUserRequestResponse.mockReturnValue(mockResponse);

      const result = await InitializeUserResolver.Mutation.initializeUser(
        {},
        { input: mockInput },
        mockContext,
      );

      expect(mockRequireAuth).toHaveBeenCalledWith(mockContext);
      expect(mockValidateInitializeUserInput).toHaveBeenCalledWith(
        mockInput,
        "user_123",
      );
      expect(mockInitializeUserRequest).toHaveBeenCalledWith(mockInput);
      expect(mockInitializeUserRequestResponse).toHaveBeenCalledWith(
        mockResult,
        "User Successfully Created",
      );
      expect(result).toEqual(mockResponse);
    });

    it("should return existing user when user already exists", async () => {
      const mockResult = { user: mockUser, created: false };
      const mockResponse = {
        user: mockUser,
        created: false,
        message: "User Already Exists",
      };

      mockRequireAuth.mockResolvedValue(mockClerkUser);
      mockValidateInitializeUserInput.mockImplementation(() => {});
      mockInitializeUserRequest.mockResolvedValue(mockResult);
      mockInitializeUserRequestResponse.mockReturnValue(mockResponse);

      const result = await InitializeUserResolver.Mutation.initializeUser(
        {},
        { input: mockInput },
        mockContext,
      );

      expect(mockInitializeUserRequestResponse).toHaveBeenCalledWith(
        mockResult,
        "User Already Exists",
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw error when authentication fails", async () => {
      mockRequireAuth.mockRejectedValue(new Error("Invalid token"));

      await expect(
        InitializeUserResolver.Mutation.initializeUser(
          {},
          { input: mockInput },
          mockContext,
        ),
      ).rejects.toThrow("Invalid token");

      expect(mockValidateInitializeUserInput).not.toHaveBeenCalled();
      expect(mockInitializeUserRequest).not.toHaveBeenCalled();
    });

    it("should throw error when validation fails", async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser);
      mockValidateInitializeUserInput.mockImplementation(() => {
        throw new Error("Invalid input");
      });

      await expect(
        InitializeUserResolver.Mutation.initializeUser(
          {},
          { input: mockInput },
          mockContext,
        ),
      ).rejects.toThrow("Invalid input");

      expect(mockInitializeUserRequest).not.toHaveBeenCalled();
    });

    it("should handle service errors gracefully", async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser);
      mockValidateInitializeUserInput.mockImplementation(() => {});
      mockInitializeUserRequest.mockRejectedValue(new Error("Database error"));

      await expect(
        InitializeUserResolver.Mutation.initializeUser(
          {},
          { input: mockInput },
          mockContext,
        ),
      ).rejects.toThrow("Database error");
    });

    it("should handle unknown errors with generic message", async () => {
      mockRequireAuth.mockResolvedValue(mockClerkUser);
      mockValidateInitializeUserInput.mockImplementation(() => {});
      mockInitializeUserRequest.mockRejectedValue("Unknown error");

      await expect(
        InitializeUserResolver.Mutation.initializeUser(
          {},
          { input: mockInput },
          mockContext,
        ),
      ).rejects.toThrow("An Unexpected Error Occurred While Initializing User");
    });
  });

  describe("Query._empty", () => {
    it("should return placeholder message", () => {
      const result = InitializeUserResolver.Query._empty();
      expect(result).toBe("This is a placeholder query");
    });
  });
});
