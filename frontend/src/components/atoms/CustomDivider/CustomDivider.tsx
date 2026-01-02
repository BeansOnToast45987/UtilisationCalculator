import { Divider } from "@mui/material";
import { CustomDividerProps } from "./CustomDivider.types";
import "./CustomDivider.scss";

export default function CustomDivider({
  flexItem,
  children,
}: CustomDividerProps) {
  return (
    <Divider
      orientation="horizontal"
      flexItem={flexItem}
      className="custom-divider"
    >
      {children}
    </Divider>
  );
}
