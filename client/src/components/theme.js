import { createTheme } from "@material-ui/core/styles";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#5C54B7",
    },
    action: {
      main: "#FD4056",
    },
    warning: {
      main: "#fff",
    },
  },
});

export const DefaultThemeStyled = {
  primary: "#fff",
  secondary: "#5C54B7",
  action: "#FD4056",
  contrast: "#fff",
};

export const DarkThemeStyled = {
  primary: "#323757",
  secondary: "#fff",
  action: "#FD4056",
  contrast: "#000",
};

export const DarkDefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#323757",
    },
    secondary: {
      main: "#fff",
    },
    action: {
      main: "#FD4056",
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
