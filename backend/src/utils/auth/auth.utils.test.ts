import { requireAuth } from "./auth.utils";
import { verifyToken, createClerkClient } from "@clerk/backend";
import { validateAuthRequest } from "../../validation/index";

jest.mock("@clerk/backend");
jest.mock("../../validation/index");

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>;
const mockCreateClerkClient = createClerkClient as jest.MockedFunction<
  typeof createClerkClient
>;
const mockValidateAuthRequest = validateAuthRequest as jest.MockedFunction<
  typeof validateAuthRequest
>;

describe("requireAuth", () => {
  const mockContext = {
    headers: {
      authorization: "Bearer valid-token",
    },
  };

  const mockAuth = {
    sub: "user_123",
    iat: 1234567890,
    exp: 1234567890,
  };

  const mockUser = {
    id: "user_123",
    privateMetadata: {
      role: "user",
    },
  };

  const mockClerkClient = {
    users: {
      getUser: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.CLERK_SECRET_KEY = "sk_test_mock_secret";
    mockCreateClerkClient.mockReturnValue(mockClerkClient as any);
    mockClerkClient.users.getUser.mockResolvedValue(mockUser as any);
  });

  afterEach(() => {
    delete process.env.CLERK_SECRET_KEY;
  });

  it("should successfully authenticate valid token", async () => {
    mockValidateAuthRequest.mockImplementation(() => {});
    mockVerifyToken.mockResolvedValue(mockAuth as any);

    const result = await requireAuth(mockContext);

    expect(mockValidateAuthRequest).toHaveBeenCalledWith(
      "Bearer valid-token",
      "valid-token",
      "sk_test_mock_secret",
    );
    expect(mockVerifyToken).toHaveBeenCalledWith("valid-token", {
      secretKey: "sk_test_mock_secret",
    });
    expect(mockClerkClient.users.getUser).toHaveBeenCalledWith("user_123");
    expect(result).toEqual({
      ...mockAuth,
      privateMetadata: mockUser.privateMetadata,
    });
  });

  it("should throw error when validation fails", async () => {
    mockValidateAuthRequest.mockImplementation(() => {
      throw new Error("Authentication Required. Please Sign in to Continue");
    });

    await expect(requireAuth(mockContext)).rejects.toThrow(
      "Authentication Required. Please Sign in to Continue",
    );
  });

  it("should throw error when token verification fails", async () => {
    mockValidateAuthRequest.mockImplementation(() => {});
    mockVerifyToken.mockRejectedValue(new Error("Invalid token"));

    await expect(requireAuth(mockContext)).rejects.toThrow(
      "Invalid or Expired Session. Please Sign in Again",
    );
  });

  it("should throw error when user fetch fails", async () => {
    mockValidateAuthRequest.mockImplementation(() => {});
    mockVerifyToken.mockResolvedValue(mockAuth as any);
    mockClerkClient.users.getUser.mockRejectedValue(
      new Error("User not found"),
    );

    await expect(requireAuth(mockContext)).rejects.toThrow(
      "Invalid or Expired Session. Please Sign in Again",
    );
  });

  it("should handle context without authorization header", async () => {
    const contextWithoutAuth = { headers: {} };

    mockValidateAuthRequest.mockImplementation(() => {
      throw new Error("Authentication Required. Please Sign in to Continue");
    });

    await expect(requireAuth(contextWithoutAuth)).rejects.toThrow(
      "Authentication Required. Please Sign in to Continue",
    );

    expect(mockValidateAuthRequest).toHaveBeenCalledWith(
      undefined,
      "",
      "sk_test_mock_secret",
    );
  });

  it("should extract token correctly from Bearer header", async () => {
    const contextWithLongToken = {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test",
      },
    };

    mockValidateAuthRequest.mockImplementation(() => {});
    mockVerifyToken.mockResolvedValue(mockAuth as any);

    await requireAuth(contextWithLongToken);

    expect(mockValidateAuthRequest).toHaveBeenCalledWith(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test",
      "sk_test_mock_secret",
    );
  });
});
