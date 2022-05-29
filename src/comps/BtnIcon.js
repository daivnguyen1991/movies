import { forwardRef } from "react";
import IconButton from "@mui/material/IconButton";

const BtnIcon = forwardRef(function ({ view, init, sx, ...rest }, ref) {
  return (
    <IconButton
      size="small"
      sx={
        view === init
          ? ({ palette }) => ({
              color: palette.primary.main,
              border: `1px solid ${palette.primary.main}`,
              ...sx,
            })
          : { ...sx }
      }
      {...rest}
      ref={ref}
    />
  );
});

export default BtnIcon;
