import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomProgressBar from "./CustomProgressBar";
import { CustomProgressBarProps } from "./CustomProgressBar.types";

describe("CustomProgressBar", () => {
  const defaultProps: CustomProgressBarProps = {
    value: 50,
    color: "success",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props and custom className", () => {
    render(<CustomProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("custom-progress-bar");
  });

  it("applies success color theme", () => {
    render(<CustomProgressBar {...defaultProps} value={75} color="success" />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("MuiLinearProgress-colorSuccess");
  });

  it("applies error color theme", () => {
    render(<CustomProgressBar {...defaultProps} value={25} color="error" />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("MuiLinearProgress-colorError");
  });

  it("handles determinate variant with specific value", () => {
    render(
      <CustomProgressBar {...defaultProps} value={80} variant="determinate" />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "80");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
  });

  it("handles different variant types and value ranges", () => {
    const { rerender } = render(
      <CustomProgressBar {...defaultProps} value={0} variant="indeterminate" />,
    );

    let progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    rerender(
      <CustomProgressBar
        {...defaultProps}
        value={100}
        variant="buffer"
        color="error"
      />,
    );

    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");

    rerender(
      <CustomProgressBar {...defaultProps} value={33} variant="query" />,
    );

    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
