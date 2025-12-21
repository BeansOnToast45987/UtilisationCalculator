import { FocusEvent } from "react";

export interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  name?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  label?: string;
}
