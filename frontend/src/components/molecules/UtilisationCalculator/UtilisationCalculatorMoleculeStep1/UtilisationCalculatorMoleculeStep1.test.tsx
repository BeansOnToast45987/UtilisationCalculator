import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  UtilisationCalculatorMoleculeStep1Header,
  UtilisationCalculatorMoleculeStep1StartDate,
  UtilisationCalculatorMoleculeStep1EndDate,
  UtilisationCalculatorMoleculeStep1TotalHours,
  UtilisationCalculatorMoleculeStep1BillableHours,
  UtilisationCalculatorMoleculeStep1TargetUtilisation,
  UtilisationCalculatorMoleculeStep1Buttons,
} from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationCalculator.title": "Calculate Utilisation",
        "utilisationCalculator.information":
          "Utilisation rate is the percentage of total working hours that are billable. Industry best practice targets 70% - 80% to allow time for professional development, administrative tasks, and strategic work",
        "utilisationCalculator.subtitle":
          "Enter your hours for the period to calculate your utilisation rate",
        "utilisationCalculator.buttons.calculate": "Calculate",
        "utilisationCalculator.buttons.clear": "Clear",
        "utilisationCalculator.fields.startDate.label": "Start Date",
        "utilisationCalculator.fields.endDate.label": "End Date",
        "utilisationCalculator.fields.totalHours.label":
          "Total Hours Worked This Week",
        "utilisationCalculator.fields.billableHours.label": "Billable Hours",
        "utilisationCalculator.fields.targetUtilisation.label":
          "Target Utilisation (%)",
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
  CustomTooltip: vi.fn(({ text }) => (
    <div data-testid="custom-tooltip" data-text={text}>
      Tooltip
    </div>
  )),
  CustomButton: vi.fn(
    ({ label, onClick, disabled, ariaLabel, buttonType, ...props }) => (
      <button
        data-testid={ariaLabel}
        onClick={onClick}
        disabled={disabled}
        data-button-type={buttonType}
        {...props}
      >
        {label}
      </button>
    ),
  ),
  CustomTextField: vi.fn(
    ({ label, value, onChange, error, helperText, ...props }) => (
      <div data-testid="custom-textfield">
        <label>{helperText || label}</label>
        <input
          value={value}
          onChange={onChange}
          data-error={error}
          {...props}
        />
      </div>
    ),
  ),
  CustomDatePicker: vi.fn(
    ({ label, value, onChange, error, helperText, ...props }) => (
      <div data-testid="custom-datepicker">
        <label>{helperText || label}</label>
        <input
          type="date"
          value={value?.toISOString?.()?.split("T")[0] || ""}
          onChange={(e) => onChange(new Date(e.target.value))}
          data-error={error}
          {...props}
        />
      </div>
    ),
  ),
}));

describe("UtilisationCalculatorMoleculeStep1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header component with title and tooltip when step1 is initialized", () => {
    render(<UtilisationCalculatorMoleculeStep1Header />);

    const title = screen.getByText("Calculate Utilisation");
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(
      "Enter your hours for the period to calculate your utilisation rate",
    );
    expect(subtitle).toBeInTheDocument();

    const tooltip = screen.getByTestId("custom-tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute(
      "data-text",
      "Utilisation rate is the percentage of total working hours that are billable. Industry best practice targets 70% - 80% to allow time for professional development, administrative tasks, and strategic work",
    );
  });

  it("should render buttons component with calculate and clear functionality when actions are needed", () => {
    const mockOnClear = vi.fn();

    render(<UtilisationCalculatorMoleculeStep1Buttons onClear={mockOnClear} />);

    const calculateButton = screen.getByTestId(
      "utilisation-calculator-molecule-step1-buttons-calculate-button",
    );
    const clearButton = screen.getByTestId(
      "utilisation-calculator-molecule-step1-buttons-clear-button",
    );

    expect(calculateButton).toBeInTheDocument();
    expect(calculateButton).toHaveTextContent("Calculate");
    expect(calculateButton).not.toBeDisabled();

    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent("Clear");

    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("should handle disabled state for buttons when form is invalid or processing", () => {
    const mockOnClear = vi.fn();

    render(
      <UtilisationCalculatorMoleculeStep1Buttons
        onClear={mockOnClear}
        disabled={true}
      />,
    );

    const calculateButton = screen.getByTestId(
      "utilisation-calculator-molecule-step1-buttons-calculate-button",
    );
    expect(calculateButton).toBeDisabled();

    const clearButton = screen.getByTestId(
      "utilisation-calculator-molecule-step1-buttons-clear-button",
    );
    expect(clearButton).not.toBeDisabled();
  });

  it("should render date picker components with proper form integration when date selection is required", () => {
    const mockStartDateChange = vi.fn();
    const mockEndDateChange = vi.fn();
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-31");

    render(
      <>
        <UtilisationCalculatorMoleculeStep1StartDate
          value={startDate}
          onChange={mockStartDateChange}
          name="startDate"
          error={false}
          helperText=""
        />
        <UtilisationCalculatorMoleculeStep1EndDate
          value={endDate}
          onChange={mockEndDateChange}
          name="endDate"
          error={false}
          helperText=""
        />
      </>,
    );

    const datePickers = screen.getAllByTestId("custom-datepicker");
    expect(datePickers).toHaveLength(2);

    const startDateInput = datePickers[0].querySelector("input");
    const endDateInput = datePickers[1].querySelector("input");

    expect(startDateInput).toHaveValue("2025-01-01");
    expect(endDateInput).toHaveValue("2025-01-31");
  });

  it("should render numeric input components with validation when hour values are entered", () => {
    const mockTotalHoursChange = vi.fn();
    const mockBillableHoursChange = vi.fn();
    const mockTargetUtilisationChange = vi.fn();

    render(
      <>
        <UtilisationCalculatorMoleculeStep1TotalHours
          value=""
          onChange={mockTotalHoursChange}
          name="totalHours"
          error={false}
          helperText=""
        />
        <UtilisationCalculatorMoleculeStep1BillableHours
          value=""
          onChange={mockBillableHoursChange}
          name="billableHours"
          error={false}
          helperText=""
        />
        <UtilisationCalculatorMoleculeStep1TargetUtilisation
          value=""
          onChange={mockTargetUtilisationChange}
          name="targetUtilisation"
          error={false}
          helperText=""
        />
      </>,
    );

    const textFields = screen.getAllByTestId("custom-textfield");
    expect(textFields).toHaveLength(3);

    const totalHoursInput = textFields[0].querySelector("input");
    const billableHoursInput = textFields[1].querySelector("input");
    const targetUtilisationInput = textFields[2].querySelector("input");

    expect(totalHoursInput).toBeInTheDocument();
    expect(billableHoursInput).toBeInTheDocument();
    expect(targetUtilisationInput).toBeInTheDocument();

    if (totalHoursInput) {
      fireEvent.change(totalHoursInput, { target: { value: "40" } });
      expect(mockTotalHoursChange).toHaveBeenCalled();
    }
  });
});
