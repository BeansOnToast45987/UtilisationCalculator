import { Button, IconButton } from "@mui/material";
import { AutoFixHigh, Cancel, Delete } from "@mui/icons-material";
import { CustomButtonProps } from "./CustomButton.types";
import "./CustomButton.scss";

export default function CustomButton({
  label,
  onClick,
  type,
  variant,
  disabled,
  ariaLabel,
  buttonType,
  color,
}: CustomButtonProps) {
  const isButtonOne = buttonType === "one";
  const isButtonTwo = buttonType === "two";
  const isButtonThree = buttonType === "three";
  const isButtonFour = buttonType === "four";

  if (isButtonThree) {
    return (
      <IconButton
        className="custom-button-three"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Cancel fontSize="medium" />
      </IconButton>
    );
  }

  if (isButtonFour) {
    return (
      <IconButton
        className="custom-button-four"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Delete fontSize="small" />
      </IconButton>
    );
  }

  const className = isButtonOne
    ? `custom-button-one custom-button-one--${color}`
    : "custom-button-two";

  const buttonProps = {
    className,
    type,
    onClick,
    variant,
    disabled,
    fullWidth: true,
    "aria-label": ariaLabel,
    ...(isButtonTwo && { startIcon: <AutoFixHigh /> }),
  };

  return (
    <Button {...buttonProps}>
      <span>{label}</span>
    </Button>
  );
}
