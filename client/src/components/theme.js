import { createTheme } from "@material-ui/core/styles";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#085D55",
    },
    action: {
      main: "#0FF4ED",
    },
    warning: {
      main: "#fff",
    },
  },
});

export const DefaultThemeStyled = {
  primary: "#fff",
  secondary: "#085D55",
  action: "#0FF4ED",
  contrast: "#000",
};

export const DarkThemeStyled = {
  primary: "#085D55",
  secondary: "#0FF4ED",
  action: "#fff",
  contrast: "#0FF4ED",
};

export const DarkDefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#085D55",
    },
    secondary: {
      main: "#0FF4ED",
    },
    action: {
      main: "#fff",
    },
    warning: {
      main: "#000",
    },
  },
});

export const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#354555",
    },
    secondary: {
      main: "#fff",
    },
    action: {
      main: "#256FC5",
    },
  },
});
