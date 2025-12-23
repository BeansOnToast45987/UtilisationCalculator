import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CustomButton from "./CustomButton";
import { CustomButtonProps } from "./CustomButton.types";

describe("CustomButton", () => {
  const defaultProps: CustomButtonProps = {
    ariaLabel: "Test button",
    buttonType: "one",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render button type one with color variants when provided with primary color", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        {...defaultProps}
        color="primary"
        label="Primary Button"
        onClick={mockClick}
        type="submit"
        disabled={false}
      />,
    );

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "custom-button-one",
      "custom-button-one--primary",
    );
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
    expect(screen.getByText("Primary Button")).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("should render button type two with start icon when using contained variant", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        {...defaultProps}
        buttonType="two"
        label="Calculate Button"
        onClick={mockClick}
        variant="contained"
      />,
    );

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-button-two");
    expect(screen.getByText("Calculate Button")).toBeInTheDocument();

    const icon = button.querySelector("svg");
    expect(icon).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("should render button type three as icon button with cancel icon when no label is provided", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        {...defaultProps}
        buttonType="three"
        ariaLabel="Cancel action"
        onClick={mockClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Cancel action" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-button-three");

    const cancelIcon = button.querySelector("svg");
    expect(cancelIcon).toBeInTheDocument();

    expect(screen.queryByText("Cancel action")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("should render button type four as icon button with delete icon when configured for deletion", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        {...defaultProps}
        buttonType="four"
        ariaLabel="Delete item"
        onClick={mockClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Delete item" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-button-four");

    const deleteIcon = button.querySelector("svg");
    expect(deleteIcon).toBeInTheDocument();

    expect(screen.queryByText("Delete item")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("should handle different props and edge cases correctly when configuration changes", () => {
    const { rerender } = render(
      <CustomButton
        {...defaultProps}
        color="secondary"
        label="Secondary Button"
        disabled={true}
      />,
    );

    let button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("custom-button-one--secondary");

    rerender(
      <CustomButton {...defaultProps} type="reset" variant="outlined" />,
    );

    button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveAttribute("type", "reset");
    expect(button).not.toBeDisabled();

    rerender(
      <CustomButton ariaLabel="Button without label" buttonType="one" />,
    );

    button = screen.getByRole("button", { name: "Button without label" });
    expect(button).toBeInTheDocument();
  });
});
