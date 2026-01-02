import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UtilisationCalculatorOrganism, {
  UtilisationCalculatorResultOrganism,
} from "./UtilisationCalculatorOrganism/UtilisationCalculatorOrganism";
import { UtilisationCalculatorOrganismProps } from "./UtilisationCalculatorOrganism/UtilisationCalculatorOrganism.types";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationCalculator.results.statusTargetMet": "Target met",
        "utilisationCalculator.results.statusBelowTarget": "Below target",
        "utilisationCalculator.results.messageSuccess":
          "Excellent work! You're meeting or exceeding your utilisation target",
        "utilisationCalculator.results.messageWarning":
          "Consider reviewing your workload allocation and billable opportunities",
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock("../../molecules/index", () => ({
  UtilisationCalculatorMoleculeStep1Header: vi.fn(() => (
    <div data-testid="step1-header">Header</div>
  )),
  UtilisationCalculatorMoleculeStep1StartDate: vi.fn(
    ({ value, onChange, error, helperText }) => (
      <div data-testid="start-date">
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Start Date"
        />
        {error && <span data-testid="start-date-error">{helperText}</span>}
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep1EndDate: vi.fn(
    ({ value, onChange, error, helperText }) => (
      <div data-testid="end-date">
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          aria-label="End Date"
        />
        {error && <span data-testid="end-date-error">{helperText}</span>}
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep1TotalHours: vi.fn(
    ({ value, onChange, error, helperText }) => (
      <div data-testid="total-hours">
        <input
          type="number"
          value={value}
          onChange={onChange}
          aria-label="Total Hours"
        />
        {error && <span data-testid="total-hours-error">{helperText}</span>}
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep1BillableHours: vi.fn(
    ({ value, onChange, error, helperText }) => (
      <div data-testid="billable-hours">
        <input
          type="number"
          value={value}
          onChange={onChange}
          aria-label="Billable Hours"
        />
        {error && <span data-testid="billable-hours-error">{helperText}</span>}
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep1TargetUtilisation: vi.fn(
    ({ value, onChange, error, helperText }) => (
      <div data-testid="target-utilisation">
        <input
          type="number"
          value={value}
          onChange={onChange}
          aria-label="Target Utilisation"
        />
        {error && (
          <span data-testid="target-utilisation-error">{helperText}</span>
        )}
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep1Buttons: vi.fn(({ onClear }) => (
    <div data-testid="form-buttons">
      <button type="submit">Calculate</button>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </div>
  )),
  UtilisationCalculatorMoleculeStep2Loader: vi.fn(() => (
    <div data-testid="loading-step">Loading...</div>
  )),
  UtilisationCalculatorMoleculeStep3Error: vi.fn(({ error, onClose }) => (
    <div data-testid="error-step">
      <span>Error: {error.message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
  UtilisationCalculatorMoleculeStep4Header: vi.fn(({ onClose }) => (
    <div data-testid="result-header">
      <span>Results</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
  UtilisationCalculatorMoleculeStep4LabeledProgressBar: vi.fn(
    ({ percentage, status, color }) => (
      <div data-testid="progress-bar" data-color={color}>
        {status}: {percentage}%
      </div>
    ),
  ),
  UtilisationCalculatorMoleculeStep4UtilisationSummaryCard: vi.fn(
    ({ message, totalHours, billableHours, target }) => (
      <div data-testid="summary-card">
        <span>{message}</span>
        <span>
          {billableHours}/{totalHours} hours ({target}% target)
        </span>
      </div>
    ),
  ),
}));

vi.mock("./UtilisationCalculatorOrganism/validation.schema", () => ({
  getValidationSchema: vi.fn(() => ({
    validate: vi.fn().mockResolvedValue({}),
    validateSync: vi.fn().mockReturnValue({}),
    isValid: vi.fn().mockReturnValue(true),
    isValidSync: vi.fn().mockReturnValue(true),
  })),
}));

describe("UtilisationCalculatorOrganism", () => {
  const defaultProps: UtilisationCalculatorOrganismProps = {
    onSubmit: vi.fn(),
    loading: false,
    error: undefined,
    onClose: vi.fn(),
  };

  const mockResultData = {
    id: "test-id-123",
    calculatedUtilisation: 80,
    targetUtilisation: 75,
    totalHours: 40,
    billableHours: 32,
    meetsTarget: true,
    startDate: "2025-01-01",
    endDate: "2025-01-07",
    calculatedAt: "2025-01-07T12:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form with all input fields when component is in default state", () => {
    render(<UtilisationCalculatorOrganism {...defaultProps} />);

    expect(screen.getByTestId("step1-header")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Total Hours")).toBeInTheDocument();
    expect(screen.getByLabelText("Billable Hours")).toBeInTheDocument();
    expect(screen.getByLabelText("Target Utilisation")).toBeInTheDocument();
    expect(screen.getByTestId("form-buttons")).toBeInTheDocument();

    const container = document.querySelector(
      ".utilisation-calculator-organism-container",
    );
    expect(container).toBeInTheDocument();
  });

  it("should display loading state when loading prop is true", () => {
    render(<UtilisationCalculatorOrganism {...defaultProps} loading={true} />);

    expect(screen.getByTestId("loading-step")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("step1-header")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Start Date")).not.toBeInTheDocument();
  });

  it("should display error state when error prop is provided", () => {
    const testError = new Error("Calculation failed");
    render(
      <UtilisationCalculatorOrganism {...defaultProps} error={testError} />,
    );

    expect(screen.getByTestId("error-step")).toBeInTheDocument();
    expect(screen.getByText("Error: Calculation failed")).toBeInTheDocument();
    expect(screen.queryByTestId("step1-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-step")).not.toBeInTheDocument();
  });

  it("should handle form submission and user interactions when valid data is provided", async () => {
    const mockOnSubmit = vi.fn();
    const mockOnClose = vi.fn();
    const testError = new Error("Test error");

    const { rerender } = render(
      <UtilisationCalculatorOrganism
        {...defaultProps}
        onSubmit={mockOnSubmit}
      />,
    );

    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");
    const totalHoursInput = screen.getByLabelText("Total Hours");
    const billableHoursInput = screen.getByLabelText("Billable Hours");
    const targetInput = screen.getByLabelText("Target Utilisation");
    const submitButton = screen.getByRole("button", { name: "Calculate" });

    fireEvent.change(startDateInput, { target: { value: "2025-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2025-01-07" } });
    fireEvent.change(totalHoursInput, { target: { value: "40" } });
    fireEvent.change(billableHoursInput, { target: { value: "32" } });
    fireEvent.change(targetInput, { target: { value: "80" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    rerender(
      <UtilisationCalculatorOrganism
        {...defaultProps}
        error={testError}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render result components with success and error states when data is provided", () => {
    const { unmount: unmountSuccess } = render(
      <UtilisationCalculatorResultOrganism
        data={mockResultData}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByTestId("result-header")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(screen.getByTestId("summary-card")).toBeInTheDocument();

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveAttribute("data-color", "success");
    expect(progressBar).toHaveTextContent("Target met: 80%");
    expect(
      screen.getByText(
        "Excellent work! You're meeting or exceeding your utilisation target",
      ),
    ).toBeInTheDocument();

    unmountSuccess();

    const belowTargetData = {
      ...mockResultData,
      calculatedUtilisation: 60,
      meetsTarget: false,
    };

    const { unmount: unmountError } = render(
      <UtilisationCalculatorResultOrganism
        data={belowTargetData}
        onClose={vi.fn()}
      />,
    );

    const errorProgressBar = screen.getByTestId("progress-bar");
    expect(errorProgressBar).toHaveAttribute("data-color", "error");
    expect(errorProgressBar).toHaveTextContent("Below target: 60%");
    expect(
      screen.getByText(
        "Consider reviewing your workload allocation and billable opportunities",
      ),
    ).toBeInTheDocument();

    unmountError();

    const { container } = render(
      <UtilisationCalculatorResultOrganism
        data={undefined}
        onClose={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});
