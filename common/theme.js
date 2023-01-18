import {bodyFont, headerFont} from "@/common/font"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#D35269",
          contrastText: "#333333",
        },
        secondary: {
          main: "#333333",
        },
        tertiary: {
          main: "#B9E3C6",
        },
        text: {
          primary: "#333333",
          secondary:  "#71A9F7",
        },
        error: {
          main: "#F0B67F"
        }
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 700,
      desktop: 1000,
    },
  },
  typography: {
    fontFamily: bodyFont.style.fontFamily,
    subtitle: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 20,
    },
    h4: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 24,
    },
    h5: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 20,
      fontStyle: "italic",
    },
    body: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 20,
    },
    body2: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 16,
    },
    tab: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 14,
    },
    footer: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    }
  },
})
