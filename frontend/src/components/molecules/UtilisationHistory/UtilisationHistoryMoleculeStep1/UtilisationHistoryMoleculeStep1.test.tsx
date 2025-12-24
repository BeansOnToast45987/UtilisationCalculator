import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  UtilisationHistoryMoleculeStep1Header,
  UtilisationHistoryMoleculeStep1HistoryCardLeft,
  UtilisationHistoryMoleculeStep1HistoryCardRight,
  UtilisationHistoryMoleculeStep1Pagination,
} from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn(
      (
        key: string,
        options?: {
          target?: number;
          billable?: number;
          total?: number;
          start?: string;
          end?: string;
        },
      ) => {
        const translations: Record<string, string> = {
          "utilisationHistory.title": "Utilisation History",
          "utilisationHistory.information":
            "View all your previously calculated utilisation records. Delete entries to manage your history",
          "utilisationHistory.noData": "No utilisation history",
          "utilisationHistory.target": `Target: ${options?.target || 0}%`,
          "utilisationHistory.billableHours": `Billable Hours: ${options?.billable || 0} / ${options?.total || 0}`,
          "utilisationHistory.period": `Period: ${options?.start || "start"} - ${options?.end || "end"}`,
          "utilisationHistory.errors.title": "Utilisation History Error",
        };
        return translations[key] || key;
      },
    ),
    i18n: {
      language: "en",
    },
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
    ({ onClick, ariaLabel, buttonType, disabled, ...props }) => (
      <button
        data-testid={ariaLabel}
        onClick={onClick}
        disabled={disabled}
        data-button-type={buttonType}
        {...props}
      >
        Delete
      </button>
    ),
  ),
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
  CustomPagination: vi.fn(({ count, page, onChange, ...props }) => (
    <div
      data-testid="custom-pagination"
      data-count={count}
      data-page={page}
      {...props}
    >
      <button onClick={(e) => onChange(e, page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {count}
      </span>
      <button onClick={(e) => onChange(e, page + 1)} disabled={page === count}>
        Next
      </button>
    </div>
  )),
}));

describe("UtilisationHistoryMoleculeStep1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header component with title and subtitle when history page is initialized", () => {
    render(<UtilisationHistoryMoleculeStep1Header />);

    const title = screen.getByText("Utilisation History");
    expect(title).toBeInTheDocument();

    const tooltip = screen.getByTestId("custom-tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute(
      "data-text",
      "View all your previously calculated utilisation records. Delete entries to manage your history",
    );

    const typographyElements = screen.getAllByTestId("custom-typography");
    const titleElement = typographyElements.find(
      (el) => el.textContent === "Utilisation History",
    );

    expect(titleElement).toHaveAttribute("data-variant", "h6");
    expect(titleElement).toHaveAttribute("data-color", "black");
  });

  it("should render left history card with utilisation percentage and target status when calculation data is provided", () => {
    const successProps = {
      percentage: 85,
      target: 80,
      calculatedAt: "2025-12-20T10:30:00Z",
      meetsTarget: true,
    };

    const { rerender } = render(
      <UtilisationHistoryMoleculeStep1HistoryCardLeft {...successProps} />,
    );

    const percentage = screen.getByText("85%");
    expect(percentage).toBeInTheDocument();

    const targetInfo = screen.getByText("Target: 80%");
    expect(targetInfo).toBeInTheDocument();

    const calculatedAt = screen.getByText("2025-12-20 10:30:00");
    expect(calculatedAt).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const percentageElement = typographyElements.find(
      (el) => el.textContent === "85%",
    );
    const targetElement = typographyElements.find(
      (el) => el.textContent === "Target: 80%",
    );

    expect(percentageElement).toHaveAttribute("data-variant", "h6");
    expect(percentageElement).toHaveAttribute("data-color", "success");
    expect(targetElement).toHaveAttribute("data-variant", "body2");
    expect(targetElement).toHaveAttribute("data-color", "black");

    const errorProps = {
      percentage: 65,
      target: 75,
      calculatedAt: "2025-12-18T09:15:00Z",
      meetsTarget: false,
    };

    rerender(
      <UtilisationHistoryMoleculeStep1HistoryCardLeft {...errorProps} />,
    );

    const errorPercentage = screen.getByText("65%");
    expect(errorPercentage).toBeInTheDocument();

    const errorTargetInfo = screen.getByText("Target: 75%");
    expect(errorTargetInfo).toBeInTheDocument();

    const errorTypographyElements = screen.getAllByTestId("custom-typography");
    const errorPercentageElement = errorTypographyElements.find(
      (el) => el.textContent === "65%",
    );

    expect(errorPercentageElement).toHaveAttribute("data-variant", "h6");
    expect(errorPercentageElement).toHaveAttribute("data-color", "error");
  });

  it("should render right history card with period details and delete functionality when history entry is displayed", () => {
    const mockOnDelete = vi.fn();
    const mockProps = {
      id: "hist-001",
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      billableHours: 32,
      totalHours: 40,
      onDelete: mockOnDelete,
    };

    render(<UtilisationHistoryMoleculeStep1HistoryCardRight {...mockProps} />);

    const billableHoursText = screen.getByText("Billable Hours: 32 / 40");
    expect(billableHoursText).toBeInTheDocument();

    const periodText = screen.getByText("Period: 01/12/2025 - 07/12/2025");
    expect(periodText).toBeInTheDocument();

    const deleteButton = screen.getByTestId(
      "utilisation-history-molecule-step1-history-card-right-delete-button",
    );
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveAttribute("data-button-type", "four");

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("hist-001");
  });

  it("should render pagination component with page navigation when multiple history entries exist", () => {
    const mockOnChange = vi.fn();
    const mockProps = {
      count: 5,
      page: 2,
      onChange: mockOnChange,
    };

    render(<UtilisationHistoryMoleculeStep1Pagination {...mockProps} />);

    const pagination = screen.getByTestId("custom-pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveAttribute("data-count", "5");
    expect(pagination).toHaveAttribute("data-page", "2");

    const currentPage = screen.getByText("Page 2 of 5");
    expect(currentPage).toBeInTheDocument();

    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should have proper CSS classes applied for styling when all history components are rendered together", () => {
    const mockOnDelete = vi.fn();
    const mockOnPageChange = vi.fn();

    const leftCardProps = {
      percentage: 75,
      target: 70,
      calculatedAt: "2025-12-15T14:20:00Z",
      meetsTarget: true,
    };

    const rightCardProps = {
      id: "hist-002",
      startDate: "2025-12-08",
      endDate: "2025-12-14",
      billableHours: 28,
      totalHours: 35,
      onDelete: mockOnDelete,
    };

    const paginationProps = {
      count: 3,
      page: 1,
      onChange: mockOnPageChange,
    };

    const { container } = render(
      <div className="utilisation-history-molecule-step1-container">
        <div className="utilisation-history-molecule-step1-header">
          <UtilisationHistoryMoleculeStep1Header />
        </div>
        <div className="utilisation-history-molecule-step1-cards">
          <div className="utilisation-history-molecule-step1-card-left">
            <UtilisationHistoryMoleculeStep1HistoryCardLeft
              {...leftCardProps}
            />
          </div>
          <div className="utilisation-history-molecule-step1-card-right">
            <UtilisationHistoryMoleculeStep1HistoryCardRight
              {...rightCardProps}
            />
          </div>
        </div>
        <div className="utilisation-history-molecule-step1-pagination">
          <UtilisationHistoryMoleculeStep1Pagination {...paginationProps} />
        </div>
      </div>,
    );

    const headerContainer = container.querySelector(
      ".utilisation-history-molecule-step1-header",
    );
    const cardsContainer = container.querySelector(
      ".utilisation-history-molecule-step1-cards",
    );
    const cardLeftContainer = container.querySelector(
      ".utilisation-history-molecule-step1-card-left",
    );
    const cardRightContainer = container.querySelector(
      ".utilisation-history-molecule-step1-card-right",
    );
    const paginationContainer = container.querySelector(
      ".utilisation-history-molecule-step1-pagination",
    );

    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass(
      "utilisation-history-molecule-step1-header",
    );

    expect(cardsContainer).toBeInTheDocument();
    expect(cardsContainer).toHaveClass(
      "utilisation-history-molecule-step1-cards",
    );

    expect(cardLeftContainer).toBeInTheDocument();
    expect(cardLeftContainer).toHaveClass(
      "utilisation-history-molecule-step1-card-left",
    );

    expect(cardRightContainer).toBeInTheDocument();
    expect(cardRightContainer).toHaveClass(
      "utilisation-history-molecule-step1-card-right",
    );

    expect(paginationContainer).toBeInTheDocument();
    expect(paginationContainer).toHaveClass(
      "utilisation-history-molecule-step1-pagination",
    );

    expect(screen.getByText("Utilisation History")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Target: 70%")).toBeInTheDocument();
    expect(screen.getByText("Billable Hours: 28 / 35")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });
});
