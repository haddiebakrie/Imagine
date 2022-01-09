import { grey, indigo } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { FC, ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectDarkThemeState } from "../../redux/slices/system-slice";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[800],
    },
    secondary: {
      main: indigo[500],
    },
    background: {
      default: grey[200],
      paper: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[600],
    },
    divider: grey[400],
  },
  shape: {
    borderRadius: 15,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[100],
    },
    secondary: {
      main: indigo[200],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: grey[50],
      secondary: grey[300],
    },
    divider: grey[200],
  },
  shape: {
    borderRadius: 15,
  },
});

interface IProps {
  children: ReactNode;
}

const LocalThemeProvider: FC<IProps> = ({ children }) => {
  const darkThemeState = useAppSelector(selectDarkThemeState);

  return (
    <ThemeProvider theme={darkThemeState ? darkTheme : theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default LocalThemeProvider;
