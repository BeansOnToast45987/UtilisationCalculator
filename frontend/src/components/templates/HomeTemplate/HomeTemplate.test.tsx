import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import HomeTemplate from "./HomeTemplate";
import { useDeviceMediaQuery } from "../../../utils/useDeviceMediaQuery";
import {
  useCalculateUtilisation,
  useGetUtilisation,
} from "../../../graphql/index";

vi.mock("../../../utils/useDeviceMediaQuery", () => ({
  useDeviceMediaQuery: vi.fn(() => ({
    isDesktopDevice: true,
    isLaptopDevice: false,
    isTabletDevice: false,
    isMobileDevice: false,
  })),
}));

vi.mock("../../../graphql/index", () => ({
  useCalculateUtilisation: vi.fn(() => ({
    calculateUtilisation: vi.fn(),
    calculateUtilisationData: null,
    calculateUtilisationLoading: false,
    calculateUtilisationError: null,
    resetCalculateUtilisation: vi.fn(),
  })),
  useGetUtilisation: vi.fn(() => ({
    getUtilisation: vi.fn(),
    getUtilisationData: null,
    getUtilisationLoading: false,
    getUtilisationError: null,
    refetchGetUtilisation: vi.fn(),
  })),
  useDeleteUtilisation: vi.fn(() => ({
    deleteUtilisation: vi.fn(),
    deleteUtilisationLoading: false,
    deleteUtilisationError: null,
    resetDeleteUtilisation: vi.fn(),
  })),
}));

vi.mock("../../organisms/index", () => ({
  CustomAppBar: vi.fn(() => <div data-testid="custom-app-bar">App Bar</div>),
  UtilisationCalculatorOrganism: vi.fn(
    ({ onSubmit, loading, error, onClose }) => (
      <div data-testid="calculator-organism">
        Calculator Organism
        <button
          onClick={() =>
            onSubmit({
              startDate: "2023-01-01",
              endDate: "2023-01-07",
              totalHours: 40,
              billableHours: 32,
              targetUtilisation: 80,
            })
          }
        >
          Submit
        </button>
        <button onClick={onClose}>Close</button>
        {loading && <div data-testid="loading">Loading</div>}
        {error && <div data-testid="error">Error</div>}
      </div>
    ),
  ),
  UtilisationCalculatorResultOrganism: vi.fn(({ data, onClose }) => (
    <div data-testid="calculator-result-organism">
      Result Organism
      <button onClick={onClose}>Close Result</button>
      <div data-testid="result-data">{JSON.stringify(data)}</div>
    </div>
  )),
  UtilisationHistoryOrganism: vi.fn(
    ({
      getUtilisationLoading,
      getUtilisationError,
      deleteUtilisation,
      refetchGetUtilisation,
      deleteUtilisationLoading,
      deleteUtilisationError,
      resetDeleteUtilisation,
    }) => (
      <div data-testid="history-organism">
        History Organism
        <button onClick={() => deleteUtilisation("test-id")}>Delete</button>
        <button onClick={() => refetchGetUtilisation()}>Refetch</button>
        <button onClick={() => resetDeleteUtilisation()}>Reset Delete</button>
        {getUtilisationLoading && (
          <div data-testid="history-loading">Loading</div>
        )}
        {getUtilisationError && <div data-testid="history-error">Error</div>}
        {deleteUtilisationLoading && (
          <div data-testid="delete-loading">Delete Loading</div>
        )}
        {deleteUtilisationError && (
          <div data-testid="delete-error">Delete Error</div>
        )}
      </div>
    ),
  ),
}));

vi.mock("@mui/material/Box", () => ({
  default: vi.fn(({ children, className }) => (
    <div data-testid="mui-box" className={className}>
      {children}
    </div>
  )),
}));

vi.mock("@mui/material/Card", () => ({
  default: vi.fn(({ children, className }) => (
    <div data-testid="mui-card" className={className}>
      {children}
    </div>
  )),
}));

describe("HomeTemplate", () => {
  const mockUseDeviceMediaQuery = vi.mocked(useDeviceMediaQuery);
  const mockUseCalculateUtilisation = vi.mocked(useCalculateUtilisation);
  const mockUseGetUtilisation = vi.mocked(useGetUtilisation);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render CustomAppBar and calculator organism by default", () => {
    render(<HomeTemplate />);

    expect(screen.getByTestId("custom-app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("calculator-organism")).toBeInTheDocument();
    expect(screen.getByTestId("history-organism")).toBeInTheDocument();
  });

  it("should render responsive layouts based on device type", () => {
    mockUseDeviceMediaQuery.mockReturnValue({
      isDesktopDevice: true,
      isLaptopDevice: false,
      isTabletDevice: false,
      isMobileDevice: false,
    });

    const { rerender } = render(<HomeTemplate />);
    let containerBox = screen.getAllByTestId("mui-box")[0];
    expect(containerBox).toHaveClass("desktop-layout-container");

    mockUseDeviceMediaQuery.mockReturnValue({
      isDesktopDevice: false,
      isLaptopDevice: true,
      isTabletDevice: false,
      isMobileDevice: false,
    });

    rerender(<HomeTemplate />);
    containerBox = screen.getAllByTestId("mui-box")[0];
    expect(containerBox).toHaveClass("laptop-layout-container");

    mockUseDeviceMediaQuery.mockReturnValue({
      isDesktopDevice: false,
      isLaptopDevice: false,
      isTabletDevice: true,
      isMobileDevice: false,
    });

    rerender(<HomeTemplate />);
    containerBox = screen.getAllByTestId("mui-box")[0];
    expect(containerBox).toHaveClass("tablet-layout-container");

    mockUseDeviceMediaQuery.mockReturnValue({
      isDesktopDevice: false,
      isLaptopDevice: false,
      isTabletDevice: false,
      isMobileDevice: true,
    });

    rerender(<HomeTemplate />);
    containerBox = screen.getAllByTestId("mui-box")[0];
    expect(containerBox).toHaveClass("mobile-layout-container");
  });

  it("should conditionally render result organism when calculation data exists", () => {
    const mockData = {
      id: "test-id",
      calculatedUtilisation: 80,
      meetsTarget: true,
      calculatedAt: "2023-01-08T00:00:00Z",
      startDate: "2023-01-01",
      endDate: "2023-01-07",
      totalHours: 40,
      billableHours: 32,
      targetUtilisation: 80,
    };

    mockUseCalculateUtilisation.mockReturnValue({
      calculateUtilisation: vi.fn(),
      calculateUtilisationData: mockData,
      calculateUtilisationLoading: false,
      calculateUtilisationError: undefined,
      resetCalculateUtilisation: vi.fn(),
    });

    render(<HomeTemplate />);

    expect(
      screen.getByTestId("calculator-result-organism"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("history-organism")).not.toBeInTheDocument();
    expect(screen.getByTestId("result-data")).toHaveTextContent(
      JSON.stringify(mockData),
    );
  });

  it("should handle form submission with correct data", async () => {
    const mockCalculateUtilisation = vi.fn();
    mockUseCalculateUtilisation.mockReturnValue({
      calculateUtilisation: mockCalculateUtilisation,
      calculateUtilisationData: undefined,
      calculateUtilisationLoading: false,
      calculateUtilisationError: undefined,
      resetCalculateUtilisation: vi.fn(),
    });

    render(<HomeTemplate />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCalculateUtilisation).toHaveBeenCalledWith({
        startDate: "2023-01-01",
        endDate: "2023-01-07",
        totalHours: 40,
        billableHours: 32,
        targetUtilisation: 80,
      });
    });
  });

  it("should handle close actions and reset state", async () => {
    const mockResetCalculateUtilisation = vi.fn();
    const mockRefetchGetUtilisation = vi.fn();

    mockUseCalculateUtilisation.mockReturnValue({
      calculateUtilisation: vi.fn(),
      calculateUtilisationData: undefined,
      calculateUtilisationLoading: false,
      calculateUtilisationError: undefined,
      resetCalculateUtilisation: mockResetCalculateUtilisation,
    });

    mockUseGetUtilisation.mockReturnValue({
      getUtilisation: vi.fn(),
      getUtilisationData: undefined,
      getUtilisationLoading: false,
      getUtilisationError: undefined,
      refetchGetUtilisation: mockRefetchGetUtilisation,
    });

    render(<HomeTemplate />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockResetCalculateUtilisation).toHaveBeenCalled();
      expect(mockRefetchGetUtilisation).toHaveBeenCalled();
    });
  });
});
