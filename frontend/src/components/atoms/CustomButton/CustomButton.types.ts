export interface CustomButtonProps {
  label?: string;
  onClick?: () => void;
  ariaLabel: string;
  variant?: "contained" | "outlined" | "text";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  buttonType: "one" | "two" | "three" | "four";
  color?: "primary" | "secondary";
}
