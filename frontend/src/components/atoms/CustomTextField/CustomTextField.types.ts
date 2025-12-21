import { FocusEvent, ChangeEvent } from 'react'

export interface CustomTextFieldProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  name?: string
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  type?: string
  disabled?: boolean
  required?: boolean
  autoFocus?: boolean
  id?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  fullWidth?: boolean
}
