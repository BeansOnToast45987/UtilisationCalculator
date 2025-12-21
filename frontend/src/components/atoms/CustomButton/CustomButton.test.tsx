import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./CustomButton";

describe("CustomButton", () => {
  it("renders button type one with label and color classes", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        ariaLabel="Test button"
        buttonType="one"
        color="primary"
        label="Click me"
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
    expect(screen.getByText("Click me")).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders button type one with secondary color and disabled state", () => {
    render(
      <CustomButton
        ariaLabel="Disabled button"
        buttonType="one"
        color="secondary"
        label="Disabled"
        disabled={true}
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "custom-button-one",
      "custom-button-one--secondary",
    );
    expect(button).toBeDisabled();
  });

  it("renders button type two with icon", () => {
    render(
      <CustomButton
        ariaLabel="Icon button"
        buttonType="two"
        label="With Icon"
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-button-two");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("renders button type three as cancel icon button", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        ariaLabel="Cancel action"
        buttonType="three"
        onClick={mockClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Cancel action" });
    expect(button).toHaveClass("custom-button-three");
    expect(button.querySelector("svg")).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders button type four as delete icon button", () => {
    const mockClick = vi.fn();
    render(
      <CustomButton
        ariaLabel="Delete item"
        buttonType="four"
        onClick={mockClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Delete item" });
    expect(button).toHaveClass("custom-button-four");
    expect(button.querySelector("svg")).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
