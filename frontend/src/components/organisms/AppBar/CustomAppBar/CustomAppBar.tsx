import { AppBar, Toolbar } from "@mui/material";
import { CustomToolbar } from "../../../molecules/index";
import "./CustomAppBar.scss";

export default function CustomAppBar() {
  return (
    <>
      <AppBar className="custom-app-bar">
        <CustomToolbar />
      </AppBar>
      <Toolbar className="toolbar-spacer" />
    </>
  );
}
