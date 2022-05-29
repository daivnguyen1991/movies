import { Box } from "@mui/system";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const UiError = () => (
  <Box
    sx={{
      p: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Something Went Wrong! can not fetch Data
    </Alert>
  </Box>
);
export default UiError;
