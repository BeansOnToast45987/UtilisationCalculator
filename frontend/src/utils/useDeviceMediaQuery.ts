import useMediaQuery from "@mui/material/useMediaQuery";

export const useDeviceMediaQuery = () => {
  const isDesktopDevice = useMediaQuery("(min-width:1024px)");
  const isLaptopDevice = useMediaQuery(
    "(min-width:768px) and (max-width:1023px)",
  );
  const isTabletDevice = useMediaQuery(
    "(min-width:500px) and (max-width:767px)",
  );
  const isMobileDevice = useMediaQuery("(max-width:499px)");

  return {
    isDesktopDevice,
    isLaptopDevice,
    isTabletDevice,
    isMobileDevice,
  };
};
