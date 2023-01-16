import {oswald, rubik} from "@/common/font"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#246EB9",
          contrastText: "#333333",
        },
        secondary: {
          main: "#333333",
        },
        tertiary: {
          main: "#B9E3C6",
        },
        error: {
          main: "#333333",
        },
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
    fontFamily: rubik.style.fontFamily,
    h1: {
      fontFamily: oswald.style.fontFamily,
      fontSize: 64,
    },
    h2: {
      fontFamily: oswald.style.fontFamily,
      fontSize: 32,
    },
    h3: {
      fontFamily: oswald.style.fontFamily,
      fontSize: 20,
    },
    button: {
      fontFamily: rubik.style.fontFamily,
    },
    body1: {
      fontFamily: rubik.style.fontFamily,
      fontSize: 16,
    },
    subtitle1: {
      fontFamily: rubik.style.fontFamily,
      fontSize: 14,
    }
  },
})
