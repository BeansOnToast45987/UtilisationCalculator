import { UserButton } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { Box, Toolbar } from "@mui/material";
import { CustomTypography } from "../../../atoms/index";
import "./CustomToolbar.scss";

export default function CustomToolbar() {
  const { t } = useTranslation();

  return (
    <Toolbar>
      <CustomTypography variant="h6" color="white">
        {t("appName")}
      </CustomTypography>
      <Box className="custom-toolbar-spacer" />
      <UserButton />
    </Toolbar>
  );
}
