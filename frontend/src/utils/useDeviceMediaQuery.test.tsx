import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDeviceMediaQuery } from "./useDeviceMediaQuery";

vi.mock("@mui/material/useMediaQuery");

describe("useDeviceMediaQuery", () => {
  const mockUseMediaQuery = vi.mocked(useMediaQuery);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true for isDesktopDevice when viewport is 1024px or wider", () => {
    mockUseMediaQuery.mockImplementation((query) => {
      if (query === "(min-width:1024px)") return true;
      return false;
    });

    const { result } = renderHook(() => useDeviceMediaQuery());

    expect(result.current.isDesktopDevice).toBe(true);
    expect(result.current.isLaptopDevice).toBe(false);
    expect(result.current.isTabletDevice).toBe(false);
    expect(result.current.isMobileDevice).toBe(false);
  });

  it("should return true for isLaptopDevice when viewport is between 768px and 1023px", () => {
    mockUseMediaQuery.mockImplementation((query) => {
      if (query === "(min-width:768px) and (max-width:1023px)") return true;
      return false;
    });

    const { result } = renderHook(() => useDeviceMediaQuery());

    expect(result.current.isDesktopDevice).toBe(false);
    expect(result.current.isLaptopDevice).toBe(true);
    expect(result.current.isTabletDevice).toBe(false);
    expect(result.current.isMobileDevice).toBe(false);
  });

  it("should return true for isTabletDevice when viewport is between 500px and 767px", () => {
    mockUseMediaQuery.mockImplementation((query) => {
      if (query === "(min-width:500px) and (max-width:767px)") return true;
      return false;
    });

    const { result } = renderHook(() => useDeviceMediaQuery());

    expect(result.current.isDesktopDevice).toBe(false);
    expect(result.current.isLaptopDevice).toBe(false);
    expect(result.current.isTabletDevice).toBe(true);
    expect(result.current.isMobileDevice).toBe(false);
  });

  it("should return true for isMobileDevice when viewport is 499px or narrower", () => {
    mockUseMediaQuery.mockImplementation((query) => {
      if (query === "(max-width:499px)") return true;
      return false;
    });

    const { result } = renderHook(() => useDeviceMediaQuery());

    expect(result.current.isDesktopDevice).toBe(false);
    expect(result.current.isLaptopDevice).toBe(false);
    expect(result.current.isTabletDevice).toBe(false);
    expect(result.current.isMobileDevice).toBe(true);
  });

  it("should call useMediaQuery with correct media query strings", () => {
    mockUseMediaQuery.mockReturnValue(false);

    renderHook(() => useDeviceMediaQuery());

    expect(mockUseMediaQuery).toHaveBeenCalledTimes(4);
    expect(mockUseMediaQuery).toHaveBeenCalledWith("(min-width:1024px)");
    expect(mockUseMediaQuery).toHaveBeenCalledWith(
      "(min-width:768px) and (max-width:1023px)",
    );
    expect(mockUseMediaQuery).toHaveBeenCalledWith(
      "(min-width:500px) and (max-width:767px)",
    );
    expect(mockUseMediaQuery).toHaveBeenCalledWith("(max-width:499px)");
  });
});
