import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { UtilisationHistoryMoleculeStep4NoData } from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationHistory.title": "Utilisation History",
        "utilisationHistory.noData": "No utilisation history data available",
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
}));

describe("UtilisationHistoryMoleculeStep4", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header component with title when no data state is displayed", () => {
    render(<UtilisationHistoryMoleculeStep4NoData />);

    const header = screen.getByText("Utilisation History");
    expect(header).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const headerElement = typographyElements.find(
      (el) => el.textContent === "Utilisation History",
    );
    expect(headerElement).toHaveAttribute("data-variant", "h6");
    expect(headerElement).toHaveAttribute("data-color", "black");
  });

  it("should display no data message with proper styling when no history is available", () => {
    render(<UtilisationHistoryMoleculeStep4NoData />);

    const noDataMessage = screen.getByText(
      "No utilisation history data available",
    );
    expect(noDataMessage).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const messageElement = typographyElements.find(
      (el) => el.textContent === "No utilisation history data available",
    );
    expect(messageElement).toHaveAttribute("data-variant", "body1");
    expect(messageElement).toHaveAttribute("data-color", "black");
  });

  it("should render both title and message elements when component is fully loaded", () => {
    render(<UtilisationHistoryMoleculeStep4NoData />);

    const titleElement = screen.getByText("Utilisation History");
    const messageElement = screen.getByText(
      "No utilisation history data available",
    );

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();

    const allTypographyElements = screen.getAllByTestId("custom-typography");
    expect(allTypographyElements).toHaveLength(2);
  });

  it("should have proper CSS classes applied for styling when component is rendered", () => {
    const { container } = render(<UtilisationHistoryMoleculeStep4NoData />);

    const noDataContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-container",
    );
    expect(noDataContainer).toBeInTheDocument();
    expect(noDataContainer).toHaveClass(
      "utilisation-history-molecule-step4-no-data-container",
    );

    const headerContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-header",
    );
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass(
      "utilisation-history-molecule-step4-no-data-header",
    );

    const contentContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-content",
    );
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass(
      "utilisation-history-molecule-step4-no-data-content",
    );
  });

  it("should maintain consistent layout structure when all no data elements are present", () => {
    const { container } = render(<UtilisationHistoryMoleculeStep4NoData />);

    const noDataContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-container",
    );
    const headerContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-header",
    );
    const contentContainer = container.querySelector(
      ".utilisation-history-molecule-step4-no-data-content",
    );

    expect(noDataContainer).toBeInTheDocument();
    expect(headerContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();

    const headerTitle = headerContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );
    expect(headerTitle).toHaveTextContent("Utilisation History");
    expect(headerTitle).toHaveAttribute("data-variant", "h6");
    expect(headerTitle).toHaveAttribute("data-color", "black");

    const contentMessage = contentContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );
    expect(contentMessage).toHaveTextContent(
      "No utilisation history data available",
    );
    expect(contentMessage).toHaveAttribute("data-variant", "body1");
    expect(contentMessage).toHaveAttribute("data-color", "black");
  });
});
