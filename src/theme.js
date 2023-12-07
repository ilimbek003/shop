import { createTheme } from "@mui/material";
import { createBreakpoints } from "@mui/system";

const breakpoints = createBreakpoints({});

export let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1440,
    },
  },

  palette: {
    primary: {
      main: "#8F27C6",
    },
    secondary: {
      main: "#F7E200",
    },
  },

  typography: {
    fontFamily: "Inter",
    lineHeight: 1,

    h1: {
      fontSize: 60,
      lineHeight: 1,
    },

    h2: {
      fontSize: 40,
      lineHeight: 1,

      [breakpoints.down(768)]: {
        fontSize: 28,
      },
    },

    h3: {
      fontSize: 32,
      lineHeight: 1,

      [breakpoints.down(768)]: {
        fontSize: 18,
      },
    },

    h4: {
      fontSize: 29,
      lineHeight: 1,
    },

    h5: {
      fontSize: 24,
      lineHeight: 1,
      [breakpoints.down(768)]: {
        fontSize: 18,
      },
    },

    h6: {
      fontSize: 22,
      lineHeight: 1,
    },

    subtitle1: {
      fontSize: 20,
      lineHeight: 1,
    },

    subtitle2: {
      fontSize: 18,
      lineHeight: 1,
    },

    body1: {
      fontSize: 16,
      lineHeight: 1,
      [breakpoints.down(768)]: {
        fontSize: 14,
      },
    },

    body2: {
      fontSize: 14,
      lineHeight: 1,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
          "&.MuiButton-outlined": {},

          "&.MuiButton-sizeLarge": {
            padding: "16px 28px",
          },

          "&.MuiButton-sizeMedium": {
            padding: "12px 24px",
          },

          "&.MuiButton-sizeSmall": {
            padding: "8px 16px",

            [breakpoints.down(768)]: {
              padding: "16px 16px",
              textTransform: "none",
              fontWeight: 400,
            },
          },
        },
      },
      variants: [
        {
          props: { variant: "oval1" },
          style: {
            padding: "16px",
            borderRadius: "1000px",
            background: "var(--primary)",
            color: "#FFF",
            "&:hover": {
              background: "var(--primary-dark)",
            },
          },
        },
        {
          props: { variant: "oval2" },
          style: {
            padding: "7px 26.5px!important",
            borderRadius: "40px",
            fontSize: 14,
            background: "#E02525",
            color: "#FFF",
            border: "1px solid transparent",
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              color: "#E02525",
              background: "transparent",
              border: "1px solid #E02525",
            },

            "&.Mui-disabled": {
              color: "#FFF",
              opacity: 0.5,
              cursor: "not-allowed!important",
            },

            [breakpoints.down(768)]: {
              padding: "7px 14.5px!important",
            },
          },
        },
        {
          props: { variant: "oval2-outlined" },
          style: {
            padding: "7px 26.5px!important",
            borderRadius: "40px",
            fontSize: 14,
            background: "transparent",
            color: "#E02525",
            border: "1px solid #E02525",
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              color: "#E02525",
              border: "1px solid #E02525",
            },

            [breakpoints.down(768)]: {
              padding: "7px 14.5px!important",
            },
          },
        },

        {
          props: { variant: "oval3" },
          style: {
            padding: "11px 28.5px!important",
            borderRadius: "40px",
            fontSize: 14,
            background: "var(--secondary)",
            color: "#1E1E1E",
            border: "1px solid transparent",
            textTransform: "none",
            "&:hover": {
              background: "var(--secondary-dark)",
            },
          },
        },
      ],
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },

          "& .MuiOutlinedInput-input": {
            padding: "12.5px 14px",
          },

          "& input": {
            "&::placeholder": {
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: 1,
              color: "#1E1E1E",
            },
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          "& .MuiSelect-outlined": {},
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: 16,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },

          "& .Mui-error fieldset": {
            borderColor: "#d32f2f!important",
          },
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          [breakpoints.down(768)]: {
            paddingLeft: 16,
            paddingRight: 16,
          },
          "&.MuiContainer-maxWidthXl": {
            maxWidth: "1280px",
          },
        },
      },
    },
  },
});
