import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { UtilisationCalculatorMoleculeStep2Loader } from "./index";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        "utilisationCalculator.title": "Calculate Utilisation",
        "app.loading": "Loading ...",
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock("../../../atoms/index", () => ({
  CustomLoader: vi.fn(({ size, ...props }) => (
    <div
      data-testid="custom-loader"
      data-size={size}
      role="progressbar"
      {...props}
    >
      Loading...
    </div>
  )),
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

describe("UtilisationCalculatorMoleculeStep2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header component with title when loading state is displayed", () => {
    render(<UtilisationCalculatorMoleculeStep2Loader />);

    const header = screen.getByText("Calculate Utilisation");
    expect(header).toBeInTheDocument();

    const typographyElements = screen.getAllByTestId("custom-typography");
    const headerElement = typographyElements.find(
      (el) => el.textContent === "Calculate Utilisation",
    );
    expect(headerElement).toHaveAttribute("data-variant", "h6");
    expect(headerElement).toHaveAttribute("data-color", "black");
  });

  it("should display loading spinner with proper size when calculation is in progress", () => {
    render(<UtilisationCalculatorMoleculeStep2Loader />);

    const loader = screen.getByTestId("custom-loader");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute("data-size", "75");
    expect(loader).toHaveAttribute("role", "progressbar");
  });

  it("should show loading message when user is waiting for calculation results", () => {
    render(<UtilisationCalculatorMoleculeStep2Loader />);

    const loadingMessage = screen.getByText("Loading ...");
    expect(loadingMessage).toBeInTheDocument();

    const messageElements = screen.getAllByTestId("custom-typography");
    const loadingMessageElement = messageElements.find(
      (el) => el.textContent === "Loading ...",
    );
    expect(loadingMessageElement).toHaveAttribute("data-variant", "body1");
    expect(loadingMessageElement).toHaveAttribute("data-color", "black");
  });

  it("should have proper CSS classes applied for styling when component is rendered", () => {
    const { container } = render(<UtilisationCalculatorMoleculeStep2Loader />);

    const headerContainer = container.querySelector(
      ".utilisation-calculator-molecule-step2-header",
    );
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass(
      "utilisation-calculator-molecule-step2-header",
    );

    const loaderContainer = container.querySelector(
      ".utilisation-calculator-molecule-step2-loader",
    );
    expect(loaderContainer).toBeInTheDocument();
    expect(loaderContainer).toHaveClass(
      "utilisation-calculator-molecule-step2-loader",
    );
  });

  it("should maintain consistent layout structure when all loading elements are present", () => {
    const { container } = render(<UtilisationCalculatorMoleculeStep2Loader />);

    const headerContainer = container.querySelector(
      ".utilisation-calculator-molecule-step2-header",
    );
    const loaderContainer = container.querySelector(
      ".utilisation-calculator-molecule-step2-loader",
    );

    expect(headerContainer).toBeInTheDocument();
    expect(loaderContainer).toBeInTheDocument();

    const headerTitle = headerContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );
    expect(headerTitle).toHaveTextContent("Calculate Utilisation");

    const loader = loaderContainer?.querySelector(
      '[data-testid="custom-loader"]',
    );
    const message = loaderContainer?.querySelector(
      '[data-testid="custom-typography"]',
    );

    expect(loader).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("Loading ...");
  });
});
