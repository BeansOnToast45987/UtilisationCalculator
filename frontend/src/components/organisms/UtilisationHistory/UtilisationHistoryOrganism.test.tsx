import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UtilisationHistoryOrganism from "./UtilisationHistoryOrganism/UtilisationHistoryOrganism";
import { UtilisationHistoryOrganismProps } from "./UtilisationHistoryOrganism/UtilisationHistoryOrganism.types";

vi.mock("../../molecules/index", () => ({
  UtilisationHistoryMoleculeStep1Header: vi.fn(() => (
    <div data-testid="history-header">History Header</div>
  )),
  UtilisationHistoryMoleculeStep1HistoryCardLeft: vi.fn(
    ({ percentage, target, meetsTarget }) => (
      <div data-testid="history-card-left">
        <span data-testid="percentage">{percentage}%</span>
        <span data-testid="target">Target: {target}%</span>
        <span data-testid="meets-target">{meetsTarget ? "✓" : "✗"}</span>
      </div>
    ),
  ),
  UtilisationHistoryMoleculeStep1HistoryCardRight: vi.fn(
    ({ id, startDate, endDate, billableHours, totalHours, onDelete }) => (
      <div data-testid="history-card-right">
        <span data-testid="date-range">
          {startDate} - {endDate}
        </span>
        <span data-testid="hours">
          {billableHours}/{totalHours} hours
        </span>
        <button
          data-testid={`delete-${id}`}
          onClick={() => onDelete(id)}
          aria-label="Delete record"
        >
          Delete
        </button>
      </div>
    ),
  ),
  UtilisationHistoryMoleculeStep1Pagination: vi.fn(
    ({ count, page, onChange }) => (
      <div data-testid="pagination">
        <span>
          Page {page} of {count}
        </span>
        <button
          data-testid="prev-page"
          onClick={(e) => onChange(e, Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          data-testid="next-page"
          onClick={(e) => onChange(e, Math.min(count, page + 1))}
          disabled={page === count}
        >
          Next
        </button>
      </div>
    ),
  ),
  UtilisationHistoryMoleculeStep2Loader: vi.fn(() => (
    <div data-testid="history-loader">Loading history...</div>
  )),
  UtilisationHistoryMoleculeStep3Error: vi.fn(({ error, onClose }) => (
    <div data-testid="history-error">
      <span>Error: {error.message}</span>
      <button onClick={onClose}>Close Error</button>
    </div>
  )),
  UtilisationHistoryMoleculeStep4NoData: vi.fn(() => (
    <div data-testid="history-no-data">No history data</div>
  )),
}));

describe("UtilisationHistoryOrganism", () => {
  const mockHistoryData = [
    {
      id: "1",
      calculatedUtilisation: 80,
      targetUtilisation: 75,
      totalHours: 40,
      billableHours: 32,
      startDate: "2025-01-01",
      endDate: "2025-01-07",
      calculatedAt: "2025-01-07T12:00:00Z",
      meetsTarget: true,
    },
    {
      id: "2",
      calculatedUtilisation: 60,
      targetUtilisation: 75,
      totalHours: 40,
      billableHours: 24,
      startDate: "2025-01-08",
      endDate: "2025-01-14",
      calculatedAt: "2025-01-14T12:00:00Z",
      meetsTarget: false,
    },
  ];

  const defaultProps: UtilisationHistoryOrganismProps = {
    getUtilisationData: mockHistoryData,
    getUtilisationLoading: false,
    getUtilisationError: undefined,
    deleteUtilisation: vi.fn(),
    refetchGetUtilisation: vi.fn(),
    deleteUtilisationLoading: false,
    deleteUtilisationError: undefined,
    resetDeleteUtilisation: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render history list with data when utilisation data is available", () => {
    render(<UtilisationHistoryOrganism {...defaultProps} />);

    expect(screen.getByTestId("history-header")).toBeInTheDocument();
    expect(screen.getAllByTestId("history-card-left")).toHaveLength(2);
    expect(screen.getAllByTestId("history-card-right")).toHaveLength(2);

    const container = document.querySelector(
      ".utilisation-history-organism-container",
    );
    expect(container).toBeInTheDocument();

    const historyList = document.querySelector(
      ".utilisation-history-organism-list",
    );
    expect(historyList).toBeInTheDocument();

    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getAllByText("Target: 75%")).toHaveLength(2);
    expect(screen.getByText("2025-01-01 - 2025-01-07")).toBeInTheDocument();
    expect(screen.getByText("32/40 hours")).toBeInTheDocument();
  });

  it("should display loading state when getUtilisationLoading is true", () => {
    render(
      <UtilisationHistoryOrganism
        {...defaultProps}
        getUtilisationLoading={true}
      />,
    );

    expect(screen.getByTestId("history-loader")).toBeInTheDocument();
    expect(screen.getByText("Loading history...")).toBeInTheDocument();
    expect(screen.queryByTestId("history-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("history-card-left")).not.toBeInTheDocument();
  });

  it("should display error state when getUtilisationError is provided", () => {
    const testError = new Error("Failed to fetch history");
    render(
      <UtilisationHistoryOrganism
        {...defaultProps}
        getUtilisationError={testError}
      />,
    );

    expect(screen.getByTestId("history-error")).toBeInTheDocument();
    expect(
      screen.getByText("Error: Failed to fetch history"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("history-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("history-loader")).not.toBeInTheDocument();
  });

  it("should display no data state when empty data array is provided", () => {
    render(
      <UtilisationHistoryOrganism {...defaultProps} getUtilisationData={[]} />,
    );

    expect(screen.getByTestId("history-no-data")).toBeInTheDocument();
    expect(screen.getByText("No history data")).toBeInTheDocument();
    expect(screen.queryByTestId("history-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("history-card-left")).not.toBeInTheDocument();
  });

  it("should handle delete operations and pagination when user interactions occur", async () => {
    const mockDeleteUtilisation = vi.fn().mockResolvedValue({});
    const mockRefetchGetUtilisation = vi.fn().mockResolvedValue({});
    const mockResetDeleteUtilisation = vi.fn();

    const { rerender } = render(
      <UtilisationHistoryOrganism
        {...defaultProps}
        deleteUtilisationLoading={true}
        deleteUtilisation={mockDeleteUtilisation}
        refetchGetUtilisation={mockRefetchGetUtilisation}
        resetDeleteUtilisation={mockResetDeleteUtilisation}
      />,
    );

    expect(screen.getByTestId("history-loader")).toBeInTheDocument();
    expect(screen.getByText("Loading history...")).toBeInTheDocument();

    const largeDataset = Array.from({ length: 6 }, (_, index) => ({
      id: `${index + 1}`,
      calculatedUtilisation: 75 + index,
      targetUtilisation: 75,
      totalHours: 40,
      billableHours: 30 + index,
      startDate: "2025-01-01",
      endDate: "2025-01-07",
      calculatedAt: "2025-01-07T12:00:00Z",
      meetsTarget: true,
    }));

    rerender(
      <UtilisationHistoryOrganism
        {...defaultProps}
        getUtilisationData={largeDataset}
        deleteUtilisationLoading={false}
        deleteUtilisation={mockDeleteUtilisation}
        refetchGetUtilisation={mockRefetchGetUtilisation}
        resetDeleteUtilisation={mockResetDeleteUtilisation}
      />,
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    const nextButton = screen.getByTestId("next-page");
    fireEvent.click(nextButton);
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-6");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteUtilisation).toHaveBeenCalledWith({ id: "6" });
      expect(mockRefetchGetUtilisation).toHaveBeenCalledTimes(1);
    });

    rerender(
      <UtilisationHistoryOrganism
        {...defaultProps}
        deleteUtilisationError={new Error("Delete failed")}
        resetDeleteUtilisation={mockResetDeleteUtilisation}
      />,
    );

    expect(screen.getByTestId("history-error")).toBeInTheDocument();
    expect(screen.getByText("Error: Delete failed")).toBeInTheDocument();

    const closeErrorButton = screen.getByRole("button", {
      name: "Close Error",
    });
    fireEvent.click(closeErrorButton);

    expect(mockResetDeleteUtilisation).toHaveBeenCalledTimes(1);
  });
});
