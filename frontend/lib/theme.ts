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
    fontFamily: "Source Sans Pro, sans-serif",
  },
});

export default materialUITheme;
