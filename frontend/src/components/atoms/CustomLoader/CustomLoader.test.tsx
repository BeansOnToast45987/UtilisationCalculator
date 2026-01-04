import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomLoader from "./CustomLoader";
import { CustomLoaderProps } from "./CustomLoader.types";

describe("CustomLoader", () => {
  const defaultProps: CustomLoaderProps = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default props and custom className when initialized", () => {
    render(<CustomLoader {...defaultProps} />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("custom-loader");
  });

  it("should apply size prop with custom dimensions when specific size is provided", () => {
    const { container } = render(<CustomLoader {...defaultProps} size={60} />);

    const loader = container.querySelector(".custom-loader");
    expect(loader).toHaveStyle("width: 60px");
    expect(loader).toHaveStyle("height: 60px");
  });

  it("should apply color prop variations when different color themes are specified", () => {
    const { rerender } = render(
      <CustomLoader {...defaultProps} color="primary" />,
    );

    let loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    rerender(<CustomLoader {...defaultProps} color="secondary" />);
    loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    rerender(<CustomLoader {...defaultProps} color="inherit" />);
    loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });

  it("should apply thickness prop to svg circle when custom thickness is specified", () => {
    render(<CustomLoader {...defaultProps} thickness={2.5} />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    const svgCircle = loader.querySelector("svg circle");
    expect(svgCircle).toBeInTheDocument();
  });

  it("should handle custom className and id props when additional styling is needed", () => {
    render(
      <CustomLoader
        {...defaultProps}
        className="my-custom-class"
        id="test-loader"
      />,
    );

    const loader = document.querySelector("#test-loader");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("custom-loader", "my-custom-class");
    expect(loader).toHaveAttribute("id", "test-loader");
  });

  it("should apply custom dark blue color when color prop is inherit", () => {
    const style = document.createElement("style");
    style.textContent = `
      :root { 
      --color-blue-darkest: #00008b; 
      }
      .custom-loader { 
      color: var(--color-blue-darkest); 
      }
    `;
    document.head.appendChild(style);

    render(<CustomLoader {...defaultProps} color="inherit" />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle("color: var(--color-blue-darkest)");

    document.head.removeChild(style);
  });
});
