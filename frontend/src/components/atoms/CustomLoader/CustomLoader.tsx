import { CircularProgress } from "@mui/material";
import { CustomLoaderProps } from "./CustomLoader.types";
import "./CustomLoader.scss";

export default function CustomLoader({
  size,
  color,
  thickness,
  className,
  id,
}: CustomLoaderProps) {
  return (
    <CircularProgress
      size={size}
      color={color}
      thickness={thickness}
      className={`custom-loader ${className || ""}`}
      id={id}
    />
  );
}
