import { TextField } from '@mui/material'
import { CustomTextFieldProps } from './CustomTextField.types'
import './CustomTextField.scss'

export default function CustomTextField({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
  label,
  placeholder,
  type,
  disabled,
  required,
  autoFocus,
  id,
  inputProps,
  fullWidth,
}: CustomTextFieldProps) {
  return (
    <TextField
      variant="outlined"
      type={type}
      className="custom-textfield"
      label={error ? helperText : label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      onBlur={onBlur}
      error={error}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      id={id}
      fullWidth={fullWidth}
      InputProps={{
        classes: {
          root: 'custom-textfield-input-root',
          notchedOutline: 'custom-textfield-input-notched',
          input: 'custom-textfield-input',
        },
      }}
      inputProps={inputProps}
    />
  )
}
