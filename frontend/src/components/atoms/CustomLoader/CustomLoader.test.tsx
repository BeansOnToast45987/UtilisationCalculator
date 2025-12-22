import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomLoader from "./CustomLoader";
import { CustomLoaderProps } from "./CustomLoader.types";

describe("CustomLoader", () => {
  const defaultProps: CustomLoaderProps = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props and custom className", () => {
    render(<CustomLoader {...defaultProps} />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("custom-loader");
  });

  it("applies size prop with custom dimensions", () => {
    const { container } = render(<CustomLoader {...defaultProps} size={60} />);

    const loader = container.querySelector(".custom-loader");
    expect(loader).toHaveStyle("width: 60px");
    expect(loader).toHaveStyle("height: 60px");
  });

  it("applies color prop variations", () => {
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

  it("applies thickness prop to svg circle", () => {
    render(<CustomLoader {...defaultProps} thickness={2.5} />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    const svgCircle = loader.querySelector("svg circle");
    expect(svgCircle).toBeInTheDocument();
  });

  it("handles custom className and id props", () => {
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
});
