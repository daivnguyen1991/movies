// @mui material components
import { createTheme } from "@mui/material/styles";
import GothamBookRegular from "./fonts/GothamBookRegular.woff";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          overflow: "hidden",
          position: "relative",
        },
        "*, *::before, *::after": {
          margin: 0,
          padding: 0,
        },
        "a, a:link, a:visited": {
          textDecoration: "none !important",
        },
        "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited":
          {
            color: "#344767 !important",
            transition: "color 150ms ease-in !important",
          },
        "a.link:hover, .link:hover, a.link:focus, .link:focus": {
          color: `#17c1e8 !important`,
        },
        styleOverrides: `
        @font-face {
          font-family: "Gotham Book Regular";
          src: url(${GothamBookRegular}) format("woff");
      }
      `,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
export default theme;
