import { ReactNode } from "react";

export interface CustomTypographyProps {
  children: ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  color?:
    | "primary"
    | "blue-darkest"
    | "blue-dark"
    | "blue-medium-dark"
    | "blue-medium"
    | "blue-medium-light"
    | "blue-light"
    | "blue-royal"
    | "blue-lightest"
    | "white"
    | "black"
    | "error"
    | "success"
    | "grey";
  align?: "left" | "center" | "right" | "justify";
  gutterBottom?: boolean;
  noWrap?: boolean;
  component?: React.ElementType;
  id?: string;
  className?: string;
}
