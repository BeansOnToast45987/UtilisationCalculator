import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { UtilisationHistoryMoleculeStep3Error } from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationHistory.errors.title": "Utilisation History Error",
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock("../../../atoms/index", () => ({
  CustomTypography: vi.fn(({ children, variant, color, ...props }) => (
    <div
      data-testid="custom-typography"
      data-variant={variant}
      data-color={color}
      {...props}
    >
      {children}
    </div>
  )),
  CustomButton: vi.fn(({ onClick, ariaLabel, buttonType, ...props }) => (
    <button
      data-testid={ariaLabel}
      onClick={onClick}
      data-button-type={buttonType}
      {...props}
    >
      Close
    </button>
  )),
}));

describe("UtilisationHistoryMoleculeStep3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error component with header title when error state is displayed", () => {
    const mockOnClose = vi.fn();

    render(
      <UtilisationHistoryMoleculeStep3Error
        error={{
          message:
            "An unexpected error occurred while fetching utilisation history.",
        }}
        onClose={mockOnClose}
      />,
    );

    const errorTitle = screen.getByText("Utilisation History Error");
    expect(errorTitle).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const titleElement = typographyElements.find(
      (el) => el.textContent === "Utilisation History Error",
    );
    expect(titleElement).toHaveAttribute("data-variant", "h6");
    expect(titleElement).toHaveAttribute("data-color", "error");
  });

  it("should display error message with proper styling when error information is provided", () => {
    const customError = {
      message:
        "Failed to load utilisation history: Database connection timeout.",
    };

    const mockOnClose = vi.fn();

    render(
      <UtilisationHistoryMoleculeStep3Error
        error={customError}
        onClose={mockOnClose}
      />,
    );

    const errorMessage = screen.getByText(
      "Failed to load utilisation history: Database connection timeout.",
    );
    expect(errorMessage).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const messageElement = typographyElements.find(
      (el) =>
        el.textContent ===
        "Failed to load utilisation history: Database connection timeout.",
    );
    expect(messageElement).toHaveAttribute("data-variant", "body1");
    expect(messageElement).toHaveAttribute("data-color", "error");
  });

  it("should render close button with proper functionality when user needs to dismiss error", () => {
    const mockOnClose = vi.fn();

    render(
      <UtilisationHistoryMoleculeStep3Error
        error={{
          message:
            "An unexpected error occurred while fetching utilisation history.",
        }}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByTestId(
      "utilisation-history-molecule-step3-error-close-button",
    );
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("data-button-type", "three");

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have proper CSS classes applied for styling when component is rendered", () => {
    const mockOnClose = vi.fn();

    const { container } = render(
      <UtilisationHistoryMoleculeStep3Error
        error={{
          message:
            "An unexpected error occurred while fetching utilisation history.",
        }}
        onClose={mockOnClose}
      />,
    );

    const errorContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error",
    );
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass(
      "utilisation-history-molecule-step3-error",
    );

    const headerContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error-header",
    );
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass(
      "utilisation-history-molecule-step3-error-header",
    );

    const contentContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error-content",
    );
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass(
      "utilisation-history-molecule-step3-error-content",
    );
  });

  it("should maintain consistent layout structure when all error elements are present", () => {
    const testError = {
      message:
        "Network error: Unable to connect to the utilisation history service.",
    };
    const mockOnClose = vi.fn();

    const { container } = render(
      <UtilisationHistoryMoleculeStep3Error
        error={testError}
        onClose={mockOnClose}
      />,
    );

    const errorContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error",
    );
    const headerContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error-header",
    );
    const contentContainer = container.querySelector(
      ".utilisation-history-molecule-step3-error-content",
    );

    expect(errorContainer).toBeInTheDocument();
    expect(headerContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();

    const headerTitle = headerContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );
    const closeButton = headerContainer?.querySelector(
      '[data-testid="utilisation-history-molecule-step3-error-close-button"]',
    );

    expect(headerTitle).toHaveTextContent("Utilisation History Error");
    expect(closeButton).toBeInTheDocument();

    const errorMessage = contentContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );
    expect(errorMessage).toHaveTextContent(
      "Network error: Unable to connect to the utilisation history service.",
    );

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });
});
