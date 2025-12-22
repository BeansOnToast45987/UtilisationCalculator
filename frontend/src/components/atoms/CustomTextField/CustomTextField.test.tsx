import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CustomTextField from "./CustomTextField";
import { CustomTextFieldProps } from "./CustomTextField.types";

describe("CustomTextField", () => {
  const defaultProps: CustomTextFieldProps = {
    value: "",
    onChange: vi.fn(),
    label: "Test Field",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props and custom classes", () => {
    render(<CustomTextField {...defaultProps} />);

    const input = screen.getByLabelText("Test Field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    const textField = document.querySelector(".custom-textfield");
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass("custom-textfield");
  });

  it("handles value and onChange events", () => {
    const onChangeMock = vi.fn();
    render(
      <CustomTextField
        {...defaultProps}
        value="initial value"
        onChange={onChangeMock}
      />,
    );

    const input = screen.getByDisplayValue("initial value");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new value" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("displays error state with helper text as label", () => {
    render(
      <CustomTextField
        {...defaultProps}
        error={true}
        helperText="This field is required"
        label="Original Label"
      />,
    );

    const input = screen.getByLabelText("This field is required");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("handles input types and form integration props", () => {
    const onBlurMock = vi.fn();
    render(
      <CustomTextField
        {...defaultProps}
        type="email"
        name="userEmail"
        id="email-input"
        placeholder="Enter your email"
        required={true}
        onBlur={onBlurMock}
      />,
    );

    const input = document.querySelector("input[name='userEmail']");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "userEmail");
    expect(input).toHaveAttribute("id", "email-input");
    expect(input).toHaveAttribute("placeholder", "Enter your email");
    expect(input).toBeRequired();

    if (input) {
      fireEvent.blur(input);
    }
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("handles disabled state and additional input configurations", () => {
    const inputProps = { maxLength: 50, "data-testid": "custom-input" };

    const { rerender } = render(
      <CustomTextField
        {...defaultProps}
        disabled={true}
        fullWidth={true}
        autoFocus={true}
        inputProps={inputProps}
      />,
    );

    let input = screen.getByLabelText("Test Field");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("maxlength", "50");
    expect(input).toHaveAttribute("data-testid", "custom-input");

    rerender(
      <CustomTextField {...defaultProps} fullWidth={false} disabled={false} />,
    );

    input = screen.getByLabelText("Test Field");
    expect(input).not.toBeDisabled();
  });
});
