import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomTypography from "./CustomTypography";
import { CustomTypographyProps } from "./CustomTypography.types";

describe("CustomTypography", () => {
  const defaultProps: CustomTypographyProps = {
    children: "Test content",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom className and children", () => {
    render(<CustomTypography {...defaultProps}>Hello World</CustomTypography>);

    const helloText = screen.getByText("Hello World");
    expect(helloText).toBeInTheDocument();

    const typography = document.querySelector(".custom-typography");
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveClass("custom-typography");
  });

  it("applies variant prop with semantic HTML elements", () => {
    const { rerender } = render(
      <CustomTypography {...defaultProps} variant="h1">
        Main Heading
      </CustomTypography>,
    );

    let typography = screen.getByRole("heading", { level: 1 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Main Heading");

    rerender(
      <CustomTypography {...defaultProps} variant="body1">
        Body Text
      </CustomTypography>,
    );

    typography = screen.getByText("Body Text");
    expect(typography).toBeInTheDocument();
  });

  it("applies color prop with CSS variable styling", () => {
    const { rerender } = render(
      <CustomTypography {...defaultProps} color="primary">
        Primary Text
      </CustomTypography>,
    );

    let typography = screen.getByText("Primary Text");
    expect(typography).toHaveStyle("color: var(--color-primary)");

    rerender(
      <CustomTypography {...defaultProps} color="error">
        Error Text
      </CustomTypography>,
    );

    typography = screen.getByText("Error Text");
    expect(typography).toHaveStyle("color: var(--color-error)");
  });

  it("handles layout and styling props", () => {
    render(
      <CustomTypography
        {...defaultProps}
        align="center"
        gutterBottom={true}
        noWrap={true}
        id="styled-text"
        className="additional-class"
      >
        Styled Text
      </CustomTypography>,
    );

    const typography = screen.getByText("Styled Text");
    expect(typography).toHaveAttribute("id", "styled-text");
    expect(typography).toHaveClass("custom-typography", "additional-class");
  });

  it("renders with custom component and complex children", () => {
    const { rerender } = render(
      <CustomTypography
        {...defaultProps}
        component="span"
        variant="caption"
        color="blue-dark"
      >
        <strong>Bold text</strong> with regular content
      </CustomTypography>,
    );

    let typography = screen.getByText("with regular content");
    expect(typography.tagName.toLowerCase()).toBe("span");
    expect(screen.getByText("Bold text")).toBeInTheDocument();

    rerender(
      <CustomTypography
        {...defaultProps}
        variant="h3"
        align="right"
        color="success"
      >
        Success Message
      </CustomTypography>,
    );

    typography = screen.getByRole("heading", { level: 3 });
    expect(typography).toHaveTextContent("Success Message");
    expect(typography).toHaveStyle("color: var(--color-success)");
  });
});
