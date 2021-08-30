import {
  Container,
  makeStyles,
  Theme,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import Navbar from "../components/navbar";
import materialUITheme from "../lib/theme";
import { Toaster } from "react-hot-toast";
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

  /// using this mixins to give height to div above component
  /// so that it will give space between navbar and main content
  toolbar: {
    ...props.mixins.toolbar,

    /// The toolbar with which main content is wrapped is there to
    /// provide space between navbar and main content. Once the mobile
    /// screen navbar is used this space is not needed, so therefore
    /// making the display none
    [props.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  main: {
    /// These paddings are in sync with navbar

    paddingLeft: "32px",
    paddingRight: "32px",

    [props.breakpoints.down("md")]: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
    [props.breakpoints.down("sm")]: {
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
        <Container className={classes.main}>
          <div className={classes.toolbar}></div>
          <Toolbar>
            <Component {...pageProps} />
            <Toaster />
          </Toolbar>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
