import { Container, makeStyles, Theme, ThemeProvider } from "@material-ui/core";
import Navbar from "../components/navbar";
import materialUITheme from "../lib/theme";
import "../styles/globals.css";

const useStyle = makeStyles((props: Theme) => ({
  root: {
    height: "100vh",
    backgroundColor: materialUITheme.palette.primary.main,
    fontFamily: materialUITheme.typography.fontFamily,
    [props.breakpoints.between("xs", "xl")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyle();

  return (
    <ThemeProvider theme={materialUITheme}>
      <Container className={classes.root}>
        <Navbar />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
