import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomDivider from "./CustomDivider";
import { CustomDividerProps } from "./CustomDivider.types";

describe("CustomDivider", () => {
  const defaultProps: CustomDividerProps = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props and custom className", () => {
    const { container } = render(<CustomDivider {...defaultProps} />);

    const divider = container.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("custom-divider");
    expect(divider).toHaveClass("MuiDivider-root");
  });

  it("renders without children as empty element", () => {
    const { container } = render(<CustomDivider {...defaultProps} />);

    const divider = container.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toBeEmptyDOMElement();
  });

  it("renders with children content", () => {
    const { container } = render(
      <CustomDivider {...defaultProps}>Section Break</CustomDivider>,
    );

    const sectionText = screen.getByText("Section Break");
    expect(sectionText).toBeInTheDocument();

    const divider = container.querySelector(".custom-divider");
    expect(divider).toHaveTextContent("Section Break");
  });

  it("renders with complex children elements", () => {
    const { container } = render(
      <CustomDivider {...defaultProps}>
        <span>Complex Content</span>
      </CustomDivider>,
    );

    const complexText = screen.getByText("Complex Content");
    expect(complexText).toBeInTheDocument();

    const divider = container.querySelector(".custom-divider");
    expect(divider).toContainElement(complexText);
    expect(divider).toHaveTextContent("Complex Content");
  });

  it("handles flexItem prop variations", () => {
    const { rerender } = render(
      <CustomDivider {...defaultProps} flexItem={true} />,
    );

    let divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();

    rerender(<CustomDivider {...defaultProps} flexItem={false} />);
    divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();

    rerender(<CustomDivider {...defaultProps} />);
    divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
  });
});
