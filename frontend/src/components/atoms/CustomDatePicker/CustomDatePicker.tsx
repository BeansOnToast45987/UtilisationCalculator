import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDatePickerProps } from "./CustomDatePicker.types";
import "./CustomDatePicker.scss";

export default function CustomDatePicker({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
  disabled,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  format,
  label,
}: CustomDatePickerProps) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      className="custom-date-picker"
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      disablePast={disablePast}
      disableFuture={disableFuture}
      format={format}
      label={error ? helperText : label}
      slotProps={{
        textField: {
          variant: "outlined",
          name: name,
          onBlur: onBlur,
          error: error,
          InputProps: {
            classes: {
              root: "custom-date-picker-input-root",
              notchedOutline: "custom-date-picker-input-notched",
              input: "custom-date-picker-input",
            },
          },
        },
      }}
    />
  );
}
