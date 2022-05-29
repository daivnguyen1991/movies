import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import BtnLink from "./BtnLink";
import BtnMenu from "./BtnMenu";
import InputSearch from "./InputSearch";

import useStore, { logoxData, menus } from "../store";
import UiSearch from "../UiSearch";

export default function HideAppBar() {
  const searchValue = useStore((s) => s.searchValue);
  return (
    <Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
        }}
      >
        <AppBar position="static">
          <Toolbar
            sx={({ typography: { pxToRem }, breakpoints: { down } }) => ({
              img: {
                width: "auto",
                height: pxToRem(30),
                mx: pxToRem(10),
              },
              "& .app-tag": { [down("lg")]: { display: "none" } },
            })}
          >
            <BtnMenu />
            <img className="app-tag" src={logoxData.url} alt={logoxData.info} />
            {menus.map(({ id, path, label }) => (
              <BtnLink className="app-tag" path={path} key={id}>
                {label}
              </BtnLink>
            ))}

            <InputSearch />
          </Toolbar>
        </AppBar>

        {Boolean(searchValue) ? <UiSearch /> : <Outlet />}
      </Box>
    </Fragment>
  );
}
