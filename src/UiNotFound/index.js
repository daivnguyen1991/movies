import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const tKeymessage = "Uh-oh, this page doesn't seem to exist.";
const tKeyBtnlabel = "go back to Now Playing";

function UiNotFound() {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",

        "@keyframes spooky": {
          from: {
            transform: "translatey(.15em) scaley(.95)",
          },
          to: {
            transform: "translatey(-.15em)",
          },
        },
      }}
    >
      <Typography gutterBottom>
        <Typography
          component="span"
          sx={{
            mr: 1,
            "& > span": {
              animation: "spooky 2s alternate infinite linear",
              display: "inline-block",
            },
          }}
        >
          4
          <span>
            <BlurCircularIcon />
          </span>
          4
        </Typography>
        {tKeymessage}
      </Typography>

      <Button
        variant="text"
        color="info"
        disableRipple
        endIcon={<ArrowRightAltIcon />}
        LinkComponent={Link}
        to="/now-playing"
        sx={{ mb: 2, textTransform: "capitalize" }}
      >
        {tKeyBtnlabel}
      </Button>
    </Box>
  );
}

export default UiNotFound;
