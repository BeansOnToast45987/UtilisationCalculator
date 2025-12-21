import { render, screen, fireEvent } from "@testing-library/react";
import CustomTextField from "./CustomTextField";

describe("CustomTextField", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    label: "Test Field",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props and custom classes", () => {
    render(<CustomTextField {...defaultProps} />);

    const textField = document.querySelector(".custom-textfield");
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass("custom-textfield");

    const input = screen.getByLabelText("Test Field");
    expect(input).toBeInTheDocument();
  });

  it("handles value and onChange events", () => {
    const onChangeMock = vi.fn();
    render(
      <CustomTextField
        {...defaultProps}
        value="test value"
        onChange={onChangeMock}
      />,
    );

    const input = screen.getByDisplayValue("test value");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new value" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("handles error state with helper text as label", () => {
    render(
      <CustomTextField
        {...defaultProps}
        error={true}
        helperText="Required field"
        label="Original Label"
      />,
    );

    const input = screen.getByLabelText("Required field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies form props and handles onBlur", () => {
    const onBlurMock = vi.fn();
    render(
      <CustomTextField
        {...defaultProps}
        name="testField"
        type="email"
        placeholder="Enter email"
        disabled={true}
        required={true}
        id="test-input"
        onBlur={onBlurMock}
      />,
    );

    const input = document.querySelector("#test-input");
    expect(input).toHaveAttribute("name", "testField");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();

    fireEvent.blur(input!);
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("applies custom input classes and additional props", () => {
    render(
      <CustomTextField
        {...defaultProps}
        autoFocus={true}
        fullWidth={true}
        inputProps={{ maxLength: 10 }}
      />,
    );

    const inputRoot = document.querySelector(".custom-textfield-input-root");
    expect(inputRoot).toBeInTheDocument();

    const input = screen.getByLabelText("Test Field");
    expect(input).toHaveAttribute("maxlength", "10");
    expect(input).toHaveFocus();
  });
});
