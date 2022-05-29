import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

const BtnMenu = forwardRef(({ as = "appBar", variant, path, ...rest }, ref) => {
  const { pathname } = useLocation();
  const isPath = pathname.includes(path);
  return (
    <Button
      {...rest}
      LinkComponent={Link}
      size="small"
      to={`${path}`}
      variant="text"
      sx={({ palette }) => ({
        color: "inherit",
        mr: 1,

        ...(isPath
          ? {
              border: `1px solid ${
                as === "appBar" ? palette.common.white : palette.primary.main
              }`,
            }
          : {}),
      })}
      ref={ref}
    />
  );
});

export default BtnMenu;
