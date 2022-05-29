import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

import useStore from "../store";

const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchValue = useStore((s) => s.setSearchValue);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      typeof setSearchValue === "function" && setSearchValue(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchValue]);
  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      disableUnderline
      size="small"
      endAdornment={
        <IconButton
          size="small"
          sx={({ palette }) => ({ color: palette.common.white })}
        >
          <SearchIcon />
        </IconButton>
      }
      sx={({ typography: { pxToRem }, palette }) => ({
        px: pxToRem(6),
        backgroundColor: alpha(palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(palette.common.white, 0.25),
        },
        borderRadius: pxToRem(8),
        color: palette.common.white,
        input: { p: 0 },
        ml: "auto",
      })}
      inputProps={{ type: "search" }}
    />
  );
};

export default InputSearch;
