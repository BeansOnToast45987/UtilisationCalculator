import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { UtilisationCalculatorMoleculeStep3Error } from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationCalculator.errors.title": "Calculate Utilisation Error",
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

describe("UtilisationCalculatorMoleculeStep3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error component with header title when error state is displayed", () => {
    const mockOnClose = vi.fn();

    render(
      <UtilisationCalculatorMoleculeStep3Error
        error={{
          message: "An unexpected error occurred while calculating utilisation.",
        }}
        onClose={mockOnClose}
      />
    );

    const errorTitle = screen.getByText("Calculate Utilisation Error");
    expect(errorTitle).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const titleElement = typographyElements.find(el => 
      el.textContent === "Calculate Utilisation Error"
    );
    expect(titleElement).toHaveAttribute("data-variant", "h6");
    expect(titleElement).toHaveAttribute("data-color", "error");
  });

  it("should display error message with proper styling when error information is provided", () => {
    const customError = {
      message: "Invalid input: Total hours must be greater than billable hours.",
    };

    const mockOnClose = vi.fn();

    render(
      <UtilisationCalculatorMoleculeStep3Error
        error={customError}
        onClose={mockOnClose}
      />
    );

    const errorMessage = screen.getByText("Invalid input: Total hours must be greater than billable hours.");
    expect(errorMessage).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const messageElement = typographyElements.find(el => 
      el.textContent === "Invalid input: Total hours must be greater than billable hours."
    );
    expect(messageElement).toHaveAttribute("data-variant", "body1");
    expect(messageElement).toHaveAttribute("data-color", "error");
  });

  it("should render close button with proper functionality when user needs to dismiss error", () => {
    const mockOnClose = vi.fn();

    render(
      <UtilisationCalculatorMoleculeStep3Error
        error={{
          message: "An unexpected error occurred while calculating utilisation.",
        }}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByTestId("utilisation-calculator-molecule-step3-error-close-button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("data-button-type", "three");

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have proper CSS classes applied for styling when component is rendered", () => {
    const mockOnClose = vi.fn();

    const { container } = render(
      <UtilisationCalculatorMoleculeStep3Error
        error={{
          message: "An unexpected error occurred while calculating utilisation.",
        }}
        onClose={mockOnClose}
      />
    );

    const errorContainer = container.querySelector(".utilisation-calculator-molecule-step3-error");
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass("utilisation-calculator-molecule-step3-error");

    const headerContainer = container.querySelector(".utilisation-calculator-molecule-step3-error-header");
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass("utilisation-calculator-molecule-step3-error-header");

    const contentContainer = container.querySelector(".utilisation-calculator-molecule-step3-error-content");
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass("utilisation-calculator-molecule-step3-error-content");
  });

  it("should maintain consistent layout structure when all error elements are present", () => {
    const testError = {
      message: "Network error: Unable to connect to the calculation service.",
    };
    const mockOnClose = vi.fn();

    const { container } = render(
      <UtilisationCalculatorMoleculeStep3Error
        error={testError}
        onClose={mockOnClose}
      />
    );

    const errorContainer = container.querySelector(".utilisation-calculator-molecule-step3-error");
    const headerContainer = container.querySelector(".utilisation-calculator-molecule-step3-error-header");
    const contentContainer = container.querySelector(".utilisation-calculator-molecule-step3-error-content");

    expect(errorContainer).toBeInTheDocument();
    expect(headerContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();

    const headerTitle = headerContainer?.querySelector('[data-testid="custom-typography"]');
    const closeButton = headerContainer?.querySelector('[data-testid="utilisation-calculator-molecule-step3-error-close-button"]');
    
    expect(headerTitle).toHaveTextContent("Calculate Utilisation Error");
    expect(closeButton).toBeInTheDocument();

    const errorMessage = contentContainer?.querySelector('[data-testid="custom-typography"]');
    expect(errorMessage).toHaveTextContent("Network error: Unable to connect to the calculation service.");

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });
});
