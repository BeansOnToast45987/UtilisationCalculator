import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomDatePicker from "./CustomDatePicker";
import { CustomDatePickerProps } from "./CustomDatePicker.types";

const DatePickerWrapper = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    {children}
  </LocalizationProvider>
);

describe("CustomDatePicker", () => {
  const defaultProps: CustomDatePickerProps = {
    value: null,
    onChange: vi.fn(),
    label: "Select Date",
  };

  const renderWithProvider = (props: CustomDatePickerProps) => {
    return render(
      <DatePickerWrapper>
        <CustomDatePicker {...props} />
      </DatePickerWrapper>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props and custom classes", () => {
    renderWithProvider(defaultProps);

    const datePickerGroup = screen.getByRole("group", { name: "Select Date" });
    expect(datePickerGroup).toBeInTheDocument();

    const datePicker = document.querySelector(".custom-date-picker");
    expect(datePicker).toBeInTheDocument();

    const inputRoot = document.querySelector(".custom-date-picker-input-root");
    expect(inputRoot).toBeInTheDocument();
  });

  it("handles value and onChange events", () => {
    const testDate = new Date("2025-01-15");
    const onChangeMock = vi.fn();

    renderWithProvider({
      ...defaultProps,
      value: testDate,
      onChange: onChangeMock,
    });

    const input = screen.getByDisplayValue("01/15/2025");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "01/20/2025" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("displays error state with helper text as label", () => {
    renderWithProvider({
      ...defaultProps,
      error: true,
      helperText: "Date is required",
      label: "Original Label",
    });

    const datePickerGroup = screen.getByRole("group", {
      name: "Date is required",
    });
    expect(datePickerGroup).toBeInTheDocument();

    const errorHelperTexts = screen.getAllByText("Date is required");
    expect(errorHelperTexts.length).toBeGreaterThan(0);

    const inputRoot = document.querySelector(".custom-date-picker-input-root");
    expect(inputRoot).toBeInTheDocument();
    expect(inputRoot).toHaveClass("Mui-error");
  });

  it("handles disabled state and date constraints", () => {
    const minDate = new Date("2025-01-01");
    const maxDate = new Date("2025-12-31");

    renderWithProvider({
      ...defaultProps,
      disabled: true,
      minDate,
      maxDate,
      disablePast: true,
      disableFuture: false,
    });

    const input = document.querySelector(".custom-date-picker-input");
    expect(input).toBeDisabled();
  });

  it("handles form integration props and custom formatting", () => {
    const onBlurMock = vi.fn();

    renderWithProvider({
      ...defaultProps,
      name: "birthDate",
      format: "dd/MM/yyyy",
      onBlur: onBlurMock,
      value: new Date("2025-01-15"),
    });

    const datePickerContainer = document.querySelector(".custom-date-picker");
    expect(datePickerContainer).toBeInTheDocument();

    const inputElement = document.querySelector("input[name='birthDate']");
    expect(inputElement).toBeInTheDocument();

    const allInputs = document.querySelectorAll("input");
    expect(allInputs.length).toBeGreaterThan(0);

    if (allInputs.length > 0) {
      fireEvent.blur(allInputs[0]);
    }
  });
});
