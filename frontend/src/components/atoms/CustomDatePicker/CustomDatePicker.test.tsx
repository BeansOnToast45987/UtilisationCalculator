import { render, screen, fireEvent } from "@testing-library/react";
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

    const hiddenInput = document.querySelector(".custom-date-picker-input");
    expect(hiddenInput).toBeInTheDocument();
  });

  it("renders with value and handles onChange", () => {
    const testDate = new Date("2025-01-15");
    const onChangeMock = vi.fn();
    renderWithProvider({
      ...defaultProps,
      value: testDate,
      onChange: onChangeMock,
    });

    const input = screen.getByDisplayValue("01/15/2025");
    expect(input).toBeInTheDocument();

    expect(onChangeMock).toBeDefined();
  });

  it("handles error state with helper text as label", () => {
    renderWithProvider({
      ...defaultProps,
      error: true,
      helperText: "Date is required",
      label: "Original Label",
    });

    const datePickerGroup = screen.getByRole("group");
    const labels = screen.getAllByText("Date is required");
    const labelElement = labels.find((el) => el.tagName === "LABEL");

    expect(labelElement).toBeInTheDocument();
    expect(datePickerGroup).toHaveAttribute("aria-invalid", "true");
  });

  it("handles disabled state", () => {
    renderWithProvider({ ...defaultProps, disabled: true });

    const monthInput = screen.getByLabelText("Month");
    expect(monthInput).toHaveAttribute("aria-disabled", "true");
  });

  it("applies form props and custom format", () => {
    const testDate = new Date("2025-01-15");
    const onBlurMock = vi.fn();

    renderWithProvider({
      ...defaultProps,
      value: testDate,
      name: "startDate",
      format: "dd/MM/yyyy",
      onBlur: onBlurMock,
    });

    const hiddenInput = document.querySelector('input[name="startDate"]');
    expect(hiddenInput).toBeInTheDocument();

    const input = screen.getByDisplayValue("15/01/2025");
    expect(input).toBeInTheDocument();

    const monthInput = screen.getByLabelText("Month");
    fireEvent.blur(monthInput);
    expect(onBlurMock).toHaveBeenCalled();
  });
});
