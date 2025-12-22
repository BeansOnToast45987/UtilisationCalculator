import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CustomTooltip from "./CustomTooltip";
import { CustomTooltipProps } from "./CustomTooltip.types";

describe("CustomTooltip", () => {
  const defaultProps: CustomTooltipProps = {
    text: "Test tooltip text",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom container class and icon button", () => {
    render(<CustomTooltip {...defaultProps} />);

    const iconButton = screen.getByRole("button");
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass("custom-tooltip-icon");
    expect(iconButton).toHaveAttribute("aria-label", "Test tooltip text");

    const icon = iconButton.querySelector("svg");
    expect(icon).toBeInTheDocument();

    const container = document.querySelector(".custom-tooltip-container");
    expect(container).toBeInTheDocument();
  });

  it("displays tooltip text on hover interaction", async () => {
    render(
      <CustomTooltip {...defaultProps} text="Helpful tooltip information" />,
    );

    const iconButton = screen.getByRole("button");

    fireEvent.mouseEnter(iconButton);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Helpful tooltip information");
    expect(tooltip).toHaveClass("MuiTooltip-popper");
  });

  it("hides tooltip on mouse leave interaction", async () => {
    render(<CustomTooltip {...defaultProps} text="Interactive tooltip" />);

    const iconButton = screen.getByRole("button");

    fireEvent.mouseEnter(iconButton);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(iconButton);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("displays tooltip on focus for keyboard accessibility", async () => {
    render(
      <CustomTooltip {...defaultProps} text="Accessible tooltip content" />,
    );

    const iconButton = screen.getByRole("button");
    fireEvent.mouseOver(iconButton);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Accessible tooltip content");
  });

  it("handles different text lengths and special characters", async () => {
    const { rerender } = render(
      <CustomTooltip {...defaultProps} text="Short" />,
    );

    let iconButton = screen.getByRole("button");
    fireEvent.mouseEnter(iconButton);

    let tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Short");

    fireEvent.mouseLeave(iconButton);

    rerender(
      <CustomTooltip
        {...defaultProps}
        text="Very long tooltip text with special characters: !@#$%^&*()"
      />,
    );

    iconButton = screen.getByRole("button");
    fireEvent.mouseEnter(iconButton);

    tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent(
      "Very long tooltip text with special characters: !@#$%^&*()",
    );
  });
});
