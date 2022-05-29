import { Box } from "@mui/system";
import Alert from "@mui/material/Alert";

const UiNoData = () => (
  <Box
    sx={{
      p: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Alert severity="info">No Data to Display</Alert>
  </Box>
);

export default UiNoData;
