import { render } from "@testing-library/react";
import { vi } from "vitest";
import { InitializeUser } from "./InitializeUser";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useInitializeUser } from "../graphql/index";

vi.mock("@clerk/clerk-react", () => ({
  useAuth: vi.fn(() => ({
    isLoaded: true,
    isSignedIn: true,
  })),
  useUser: vi.fn(() => ({
    user: {
      id: "test-clerk-id",
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
    },
  })),
}));

vi.mock("../graphql/index", () => ({
  useInitializeUser: vi.fn(() => ({
    initializeUser: vi.fn(() => Promise.resolve()),
    initializeUserLoading: false,
    initializeUserError: null,
  })),
  Country: {},
}));

vi.mock("../utils/countryMapping", () => ({
  getCurrentUserCountry: vi.fn(() => "GB"),
}));

vi.mock("./i18n", () => ({
  default: { language: "en" },
}));

describe("InitializeUser", () => {
  const mockUseAuth = vi.mocked(useAuth);
  const mockUseUser = vi.mocked(useUser);
  const mockUseInitializeUser = vi.mocked(useInitializeUser);
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  it("should render without crashing when component initializes", () => {
    render(<InitializeUser />);

    expect(mockUseAuth).toHaveBeenCalled();
    expect(mockUseUser).toHaveBeenCalled();
    expect(mockUseInitializeUser).toHaveBeenCalled();
  });

  it("should log error when initializeUserError exists", () => {
    mockUseInitializeUser.mockReturnValue({
      initializeUser: vi.fn(() => Promise.resolve(null)),
      initializeUserData: undefined,
      initializeUserLoading: false,
      initializeUserError: { message: "Test error" } as any,
    });

    render(<InitializeUser />);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to initialize user:",
      "Test error",
    );
  });

  it("should call initializeUser when all conditions are met", async () => {
    const mockInitializeUser = vi.fn(() => Promise.resolve(null));
    mockUseInitializeUser.mockReturnValue({
      initializeUser: mockInitializeUser as any,
      initializeUserData: undefined,
      initializeUserLoading: false,
      initializeUserError: undefined,
    });

    render(<InitializeUser />);

    expect(mockInitializeUser).toHaveBeenCalledWith({
      clerkId: "test-clerk-id",
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      country: "GB",
    });
  });

  it("should not initialize when user is not loaded or signed in", () => {
    const mockInitializeUser = vi.fn(() => Promise.resolve(null));
    mockUseAuth.mockReturnValue({
      isLoaded: false,
      isSignedIn: undefined,
    } as any);
    mockUseInitializeUser.mockReturnValue({
      initializeUser: mockInitializeUser,
      initializeUserData: undefined,
      initializeUserLoading: false,
      initializeUserError: undefined,
    });

    render(<InitializeUser />);

    expect(mockInitializeUser).not.toHaveBeenCalled();
  });

  it("should not initialize when already loading", () => {
    const mockInitializeUser = vi.fn(() => Promise.resolve(null));
    mockUseInitializeUser.mockReturnValue({
      initializeUser: mockInitializeUser,
      initializeUserData: undefined,
      initializeUserLoading: true,
      initializeUserError: undefined,
    });

    render(<InitializeUser />);

    expect(mockInitializeUser).not.toHaveBeenCalled();
  });
});
