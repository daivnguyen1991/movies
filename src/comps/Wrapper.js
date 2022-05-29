import { Box } from "@mui/system";

function Wrapper({ children }) {
  return (
    <Box
      sx={({ typography: { pxToRem }, breakpoints }) => ({
        display: "grid",
        justifyItems: "center",
        "& > *": {
          width: `min(100%, ${pxToRem(breakpoints.values.lg)})`,
          p: 0,
        },
      })}
    >
      {children}
    </Box>
  );
}

export default Wrapper;
