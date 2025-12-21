import { render } from "@testing-library/react";
import CustomDivider from "./CustomDivider";

describe("CustomDivider", () => {
  it("renders with custom className", () => {
    render(<CustomDivider />);

    const divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("custom-divider");
  });

  it("renders without children", () => {
    render(<CustomDivider />);

    const divider = document.querySelector(".custom-divider");
    expect(divider).toBeEmptyDOMElement();
  });

  it("renders with children content", () => {
    render(<CustomDivider>Section Break</CustomDivider>);

    const divider = document.querySelector(".custom-divider");
    expect(divider).toHaveTextContent("Section Break");
  });

  it("applies flexItem prop when true", () => {
    render(<CustomDivider flexItem={true} />);

    const divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
  });

  it("does not apply flexItem when false or undefined", () => {
    const { rerender } = render(<CustomDivider flexItem={false} />);
    let divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();

    rerender(<CustomDivider />);
    divider = document.querySelector(".custom-divider");
    expect(divider).toBeInTheDocument();
  });
});
