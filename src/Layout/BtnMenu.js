import { Fragment, useCallback } from "react";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import useStore, { logoxData, menus } from "../store";
import BtnLink from "./BtnLink";

function BtnMenu() {
  const isOpen = useStore((s) => s.isOpen);
  const setIsOpen = useStore((s) => s.setIsOpen);
  const toggleDrawer = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      typeof setIsOpen === "function" && setIsOpen();
    },
    [setIsOpen]
  );

  return (
    <Fragment>
      <IconButton
        size="small"
        sx={({ palette, breakpoints: { up } }) => ({
          color: palette.common.white,
          [up("lg")]: { display: "none" },
        })}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        // open
        onClose={toggleDrawer}
        PaperProps={{
          sx: ({ typography: { pxToRem }, spacing, palette }) => ({
            p: spacing(1),
            width: `min(50%, ${pxToRem(250)})`,
            img: {
              height: pxToRem(40),
              mb: spacing(1),
            },
            "& .app-tag": {
              color: palette.primary.main,
              mr: 0,
              justifyContent: "flex-start",
            },
            hr: { my: 1 },
          }),
        }}
      >
        <img src={logoxData.url} alt={logoxData.info} />
        <Divider />
        {menus.map(({ id, path, label }) => (
          <BtnLink
            className="app-tag"
            as="drawer"
            path={path}
            key={id}
            onClick={() => typeof setIsOpen === "function" && setIsOpen()}
          >
            {label}
          </BtnLink>
        ))}
      </Drawer>
    </Fragment>
  );
}

export default BtnMenu;
