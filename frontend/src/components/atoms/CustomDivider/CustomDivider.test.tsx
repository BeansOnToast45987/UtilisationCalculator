import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomDivider from "./CustomDivider";
import { CustomDividerProps } from "./CustomDivider.types";

describe("CustomDivider", () => {
  const defaultProps: CustomDividerProps = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default props and custom className when no additional props are provided", () => {
    const { container } = render(<CustomDivider {...defaultProps} />);

    const divider = container.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("custom-divider");
    expect(divider).toHaveClass("MuiDivider-root");
  });

  it("should render without children as empty element when no content is provided", () => {
    const { container } = render(<CustomDivider {...defaultProps} />);

    const divider = container.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toBeEmptyDOMElement();
  });

  it("should render with children content when text content is provided", () => {
    const { container } = render(
      <CustomDivider {...defaultProps}>Section Break</CustomDivider>,
    );

    const sectionText = screen.getByText("Section Break");
    expect(sectionText).toBeInTheDocument();

    const divider = container.querySelector(".custom-divider");
    expect(divider).toHaveTextContent("Section Break");
  });

  it("should render with complex children elements when JSX elements are provided", () => {
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

  it("should handle flexItem prop variations when different flex configurations are applied", () => {
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
