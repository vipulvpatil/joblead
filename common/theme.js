import {bodyFont, headerFont} from "@/common/font"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

const colors = {
  primaryColor: "#D35269",
  backgroundColor: "#333333",
  secondaryColor: "#B9E3C6",
  tertiaryColor: "#71A9F7",
  emergencyColor: "#F0B67F",
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.primaryColor,
          contrastText: colors.backgroundColor,
        },
        secondary: {
          main: colors.backgroundColor,
        },
        tertiary: {
          main: colors.secondaryColor,
        },
        text: {
          primary: colors.backgroundColor,
          secondary:  colors.tertiaryColor,
        },
        error: {
          main: colors.emergencyColor,
        },
        action: {
          disabled: `${colors.backgroundColor}5C`,
          disabledBackground: `${colors.primaryColor}5C`
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
