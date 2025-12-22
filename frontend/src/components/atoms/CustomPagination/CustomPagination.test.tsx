import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CustomPagination from "./CustomPagination";
import { CustomPaginationProps } from "./CustomPagination.types";

describe("CustomPagination", () => {
  const defaultProps: CustomPaginationProps = {
    count: 10,
    page: 1,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props and custom className", () => {
    render(<CustomPagination {...defaultProps} />);

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBeGreaterThan(0);

    const pagination = document.querySelector(".custom-pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveClass("custom-pagination");
  });

  it("renders with current page selected and proper navigation", () => {
    render(<CustomPagination {...defaultProps} page={3} />);

    const currentPageButton = screen.getByRole("button", { name: "page 3" });
    expect(currentPageButton).toHaveAttribute("aria-current", "page");

    const page2Button = screen.getByRole("button", { name: "Go to page 2" });
    expect(page2Button).toBeInTheDocument();
  });

  it("handles page change events correctly", () => {
    const onChangeMock = vi.fn();
    render(<CustomPagination {...defaultProps} onChange={onChangeMock} />);

    const page2Button = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(page2Button);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it("shows first and last buttons when enabled", () => {
    render(
      <CustomPagination
        {...defaultProps}
        count={20}
        page={10}
        showFirstButton={true}
        showLastButton={true}
      />,
    );

    const firstButton = screen.getByRole("button", {
      name: "Go to first page",
    });
    const lastButton = screen.getByRole("button", { name: "Go to last page" });

    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  it("handles edge cases with different page counts and positions", () => {
    const { rerender } = render(
      <CustomPagination {...defaultProps} count={1} page={1} />,
    );

    let pagination = document.querySelector(".custom-pagination");
    expect(pagination).toBeInTheDocument();

    rerender(
      <CustomPagination
        {...defaultProps}
        count={100}
        page={50}
        showFirstButton={false}
        showLastButton={false}
      />,
    );

    pagination = document.querySelector(".custom-pagination");
    expect(pagination).toBeInTheDocument();

    const firstButton = screen.queryByRole("button", {
      name: "Go to first page",
    });
    const lastButton = screen.queryByRole("button", {
      name: "Go to last page",
    });

    expect(firstButton).not.toBeInTheDocument();
    expect(lastButton).not.toBeInTheDocument();
  });
});
