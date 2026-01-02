import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomAppBar from "./CustomAppBar/CustomAppBar";

vi.mock("../../molecules/index", () => ({
  CustomToolbar: vi.fn(() => (
    <div data-testid="custom-toolbar">CustomToolbar</div>
  )),
}));

describe("CustomAppBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render AppBar with custom class and toolbar spacer when component is initialized", () => {
    const { container } = render(<CustomAppBar />);

    const appBar = container.querySelector(".custom-app-bar");
    expect(appBar).toBeInTheDocument();
    expect(appBar).toHaveClass("custom-app-bar", "MuiAppBar-root");

    const toolbarSpacer = container.querySelector(".toolbar-spacer");
    expect(toolbarSpacer).toBeInTheDocument();
    expect(toolbarSpacer).toHaveClass("toolbar-spacer", "MuiToolbar-root");
  });

  it("should render CustomToolbar component within the AppBar when component loads", () => {
    render(<CustomAppBar />);

    const customToolbar = screen.getByTestId("custom-toolbar");
    expect(customToolbar).toBeInTheDocument();
    expect(customToolbar).toHaveTextContent("CustomToolbar");
  });

  it("should apply correct Material-UI component structure when rendered with MUI components", () => {
    const { container } = render(<CustomAppBar />);

    const appBar = container.querySelector(".MuiAppBar-root");
    expect(appBar).toBeInTheDocument();

    const toolbarSpacer = container.querySelector(
      ".MuiToolbar-root.toolbar-spacer",
    );
    expect(toolbarSpacer).toBeInTheDocument();

    const toolbarInsideAppBar = appBar?.querySelector(
      '[data-testid="custom-toolbar"]',
    );
    expect(toolbarInsideAppBar).toBeInTheDocument();
  });

  it("should render two separate elements when displaying AppBar and spacer components", () => {
    const { container } = render(<CustomAppBar />);

    const allToolbars = container.querySelectorAll(".MuiToolbar-root");
    expect(allToolbars).toHaveLength(1);

    const appBar = container.querySelector(".MuiAppBar-root");
    const toolbarSpacer = container.querySelector(".toolbar-spacer");

    expect(appBar).toBeInTheDocument();
    expect(toolbarSpacer).toBeInTheDocument();
    expect(appBar).not.toBe(toolbarSpacer);
  });

  it("should maintain proper component hierarchy when CustomToolbar is nested within AppBar", () => {
    const { container } = render(<CustomAppBar />);

    const appBar = container.querySelector(".custom-app-bar") as HTMLElement;
    const customToolbar = screen.getByTestId("custom-toolbar");
    const toolbarSpacer = container.querySelector(
      ".toolbar-spacer",
    ) as HTMLElement;

    expect(appBar).toBeInTheDocument();
    expect(customToolbar).toBeInTheDocument();
    expect(toolbarSpacer).toBeInTheDocument();

    expect(appBar).toContainElement(customToolbar);

    expect(appBar).not.toContainElement(toolbarSpacer);
  });
});
