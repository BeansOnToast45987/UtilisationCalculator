import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  UtilisationCalculatorMoleculeStep4Header,
  UtilisationCalculatorMoleculeStep4LabeledProgressBar,
  UtilisationCalculatorMoleculeStep4UtilisationSummaryCard,
} from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string, options?: { target?: number }) => {
      const translations: Record<string, string> = {
        "utilisationCalculator.results.title": "Result",
        "utilisationCalculator.results.progressMin": "0%",
        "utilisationCalculator.results.progressMax": "100%",
        "utilisationCalculator.results.progressTarget": `Target: ${options?.target || 0}%`,
        "utilisationCalculator.results.totalHours": "Total Hours",
        "utilisationCalculator.results.billableHours": "Billable Hours",
        "utilisationCalculator.results.target": "Target",
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
  CustomProgressBar: vi.fn(({ value, variant, color, ...props }) => (
    <div
      data-testid="custom-progress-bar"
      data-value={value}
      data-variant={variant}
      data-color={color}
      role="progressbar"
      {...props}
    >
      Progress: {value}%
    </div>
  )),
  CustomDivider: vi.fn(({ flexItem, ...props }) => (
    <div
      data-testid="custom-divider"
      data-flex-item={flexItem}
      {...props}
    >
      Divider
    </div>
  )),
}));

describe("UtilisationCalculatorMoleculeStep4", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header component with title and close button when results are displayed", () => {
    const mockOnClose = vi.fn();

    render(<UtilisationCalculatorMoleculeStep4Header onClose={mockOnClose} />);

    const resultTitle = screen.getByText("Result");
    expect(resultTitle).toBeInTheDocument();

    const titleElement = screen.getByTestId("custom-typography");
    expect(titleElement).toHaveAttribute("data-variant", "h6");
    expect(titleElement).toHaveAttribute("data-color", "black");

    const closeButton = screen.getByTestId("utilisation-calculator-molecule-step4-header-close-button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("data-button-type", "three");

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render progress bar with percentage and status when calculation results are successful", () => {
    const successProps = {
      percentage: 85,
      status: "Target met",
      value: 85,
      target: 80,
      color: "success" as const,
    };

    render(<UtilisationCalculatorMoleculeStep4LabeledProgressBar {...successProps} />);

    const percentage = screen.getByText("85%");
    expect(percentage).toBeInTheDocument();

    const status = screen.getByText("Target met");
    expect(status).toBeInTheDocument();

    const progressBar = screen.getByTestId("custom-progress-bar");
    expect(progressBar).toHaveAttribute("data-value", "85");
    expect(progressBar).toHaveAttribute("data-variant", "determinate");
    expect(progressBar).toHaveAttribute("data-color", "success");

    const targetLabel = screen.getByText("Target: 80%");
    expect(targetLabel).toBeInTheDocument();
  });

  it("should render progress bar with error styling when target is not met", () => {
    const errorProps = {
      percentage: 65,
      status: "Below target",
      value: 65,
      target: 75,
      color: "error" as const,
    };

    render(<UtilisationCalculatorMoleculeStep4LabeledProgressBar {...errorProps} />);

    const percentage = screen.getByText("65%");
    expect(percentage).toBeInTheDocument();

    const status = screen.getByText("Below target");
    expect(status).toBeInTheDocument();

    const progressBar = screen.getByTestId("custom-progress-bar");
    expect(progressBar).toHaveAttribute("data-color", "error");

    const typographyElements = screen.getAllByTestId("custom-typography");
    const percentageElement = typographyElements.find(el => el.textContent === "65%");
    const statusElement = typographyElements.find(el => el.textContent === "Below target");

    expect(percentageElement).toHaveAttribute("data-color", "error");
    expect(statusElement).toHaveAttribute("data-color", "error");
  });

  it("should render summary card with utilisation details when calculation data is provided", () => {
    const summaryProps = {
      message: "Excellent work! You're meeting or exceeding your utilisation target",
      messageColor: "success" as const,
      totalHours: 40,
      billableHours: 32,
      target: 80,
    };

    render(<UtilisationCalculatorMoleculeStep4UtilisationSummaryCard {...summaryProps} />);

    const message = screen.getByText("Excellent work! You're meeting or exceeding your utilisation target");
    expect(message).toBeInTheDocument();

    const totalHoursLabel = screen.getByText("Total Hours");
    const totalHoursValue = screen.getByText("40");
    expect(totalHoursLabel).toBeInTheDocument();
    expect(totalHoursValue).toBeInTheDocument();

    const billableHoursLabel = screen.getByText("Billable Hours");
    const billableHoursValue = screen.getByText("32");
    expect(billableHoursLabel).toBeInTheDocument();
    expect(billableHoursValue).toBeInTheDocument();

    const targetLabel = screen.getByText("Target");
    const targetValue = screen.getByText("80%");
    expect(targetLabel).toBeInTheDocument();
    expect(targetValue).toBeInTheDocument();

    const divider = screen.getByTestId("custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute("data-flex-item", "true");
  });

  it("should maintain consistent layout structure when all step4 components are integrated", () => {
    const mockOnClose = vi.fn();
    const progressProps = {
      percentage: 75,
      status: "Target met",
      value: 75,
      target: 70,
      color: "success" as const,
    };
    const summaryProps = {
      message: "Great job! Your utilisation rate is on target",
      messageColor: "success" as const,
      totalHours: 35,
      billableHours: 26,
      target: 75,
    };

    const { container } = render(
      <>
        <UtilisationCalculatorMoleculeStep4Header onClose={mockOnClose} />
        <UtilisationCalculatorMoleculeStep4LabeledProgressBar {...progressProps} />
        <UtilisationCalculatorMoleculeStep4UtilisationSummaryCard {...summaryProps} />
      </>
    );

    const headerContainer = container.querySelector(".utilisation-calculator-molecule-step4-header");
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass("utilisation-calculator-molecule-step4-header");

    const progressContainer = container.querySelector(".utilisation-calculator-molecule-step4-labeled-progress-bar-wrapper");
    expect(progressContainer).toBeInTheDocument();
    expect(progressContainer).toHaveClass("utilisation-calculator-molecule-step4-labeled-progress-bar-wrapper");

    const summaryContainer = container.querySelector(".utilisation-calculator-molecule-step4-utilisation-summary-card");
    expect(summaryContainer).toBeInTheDocument();
    expect(summaryContainer).toHaveClass("utilisation-calculator-molecule-step4-utilisation-summary-card");

    expect(screen.getByText("Result")).toBeInTheDocument();
    
    const percentageTexts = screen.getAllByText("75%");
    expect(percentageTexts).toHaveLength(2);
    
    const progressPercentage = percentageTexts.find(el => 
      el.getAttribute("data-variant") === "h3" && 
      el.getAttribute("data-color") === "success"
    );
    expect(progressPercentage).toBeInTheDocument();
    
    const targetPercentage = percentageTexts.find(el => 
      el.getAttribute("data-variant") === "h6" && 
      el.getAttribute("data-color") === "black"
    );
    expect(targetPercentage).toBeInTheDocument();
    
    expect(screen.getByText("Target met")).toBeInTheDocument();
    expect(screen.getByText("Great job! Your utilisation rate is on target")).toBeInTheDocument();
    expect(screen.getByText("26")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();

    const closeButton = screen.getByTestId("utilisation-calculator-molecule-step4-header-close-button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
