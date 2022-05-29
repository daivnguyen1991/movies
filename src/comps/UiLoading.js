import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

const UiLoading = () => (
  <Box
    sx={{
      p: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);
export default UiLoading;
