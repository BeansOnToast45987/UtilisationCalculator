import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { UserButton } from "@clerk/clerk-react";
import CustomToolbar from "./CustomToolbar/CustomToolbar";

vi.mock("@clerk/clerk-react", () => ({
  UserButton: vi.fn(() => <div data-testid="user-button">UserButton</div>),
}));

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        appName: "Utilisation Calculator",
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock("../../atoms/index", () => ({
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

describe("CustomToolbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render basic toolbar structure when initialized", () => {
    const { container } = render(<CustomToolbar />);

    const toolbar = container.querySelector(".MuiToolbar-root");
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveClass("MuiToolbar-root");
  });

  it("should display app name using translation when component loads", () => {
    render(<CustomToolbar />);

    const appNameText = screen.getByText("Utilisation Calculator");
    expect(appNameText).toBeInTheDocument();

    const typography = screen.getByTestId("custom-typography");
    expect(typography).toHaveAttribute("data-variant", "h6");
    expect(typography).toHaveAttribute("data-color", "white");
  });

  it("should render UserButton component when authentication is required", () => {
    render(<CustomToolbar />);

    const userButton = screen.getByTestId("user-button");
    expect(userButton).toBeInTheDocument();
    expect(UserButton).toHaveBeenCalledTimes(1);
  });

  it("should include spacer element for layout positioning when content needs separation", () => {
    const { container } = render(<CustomToolbar />);

    const spacer = container.querySelector(".custom-toolbar-spacer");
    expect(spacer).toBeInTheDocument();
    expect(spacer).toHaveClass("custom-toolbar-spacer");
  });

  it("should maintain proper component structure and order when all elements are rendered", () => {
    const { container } = render(<CustomToolbar />);

    const toolbar = container.querySelector(".MuiToolbar-root") as HTMLElement;
    const toolbarChildren = Array.from(toolbar?.children || []);

    expect(toolbarChildren).toHaveLength(3);

    const typography = screen.getByTestId("custom-typography");
    const spacer = container.querySelector(
      ".custom-toolbar-spacer",
    ) as HTMLElement;
    const userButton = screen.getByTestId("user-button");

    expect(toolbar).toContainElement(typography);
    expect(toolbar).toContainElement(spacer);
    expect(toolbar).toContainElement(userButton);

    expect(spacer?.tagName.toLowerCase()).toBe("div");
  });
});
