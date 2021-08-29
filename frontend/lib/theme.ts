import { createTheme } from "@material-ui/core";

const materialUITheme = createTheme({
  palette: {
    primary: { main: "#f7f7f7" }, /// white
    secondary: { main: "#309bff" }, /// blue
    text: {
      primary: "#141414", /// darker black
      secondary: "#242424", /// ligher black
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontFamily: "Playfair Display, serif",
    },
  },
});

materialUITheme.typography.h1.color = materialUITheme.palette.text.primary;
materialUITheme.typography.body1.color = materialUITheme.palette.text.secondary;

export default materialUITheme;
