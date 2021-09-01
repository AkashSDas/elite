import { createTheme } from "@material-ui/core";

const materialUITheme = createTheme({
  palette: {
    // primary: { main: "#f7f7f7" }, /// white
    primary: { main: "#fff" }, /// white
    secondary: { main: "#309bff" }, /// blue
    text: {
      primary: "#141414", /// darker black
      secondary: "#575757", /// ligher black
    },
  },
  typography: {
    fontFamily: "Rubik, sans-serif",
    h1: { fontFamily: "Playfair Display, serif", fontWeight: 700 },
    h4: { fontFamily: "Playfair Display, serif", fontWeight: 700 },
    h5: { fontFamily: "Playfair Display, serif", fontWeight: 700 },
  },
});

materialUITheme.typography.h1.color = materialUITheme.palette.text.primary;
materialUITheme.typography.body1.color = materialUITheme.palette.text.secondary;

export default materialUITheme;
