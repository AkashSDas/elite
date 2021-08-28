import { Container, makeStyles, Theme } from "@material-ui/core";
import Navbar from "../components/navbar";
import materialUITheme from "../lib/theme";

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

function Index() {
  const classes = useStyle();

  return (
    <Container className={classes.root}>
      <Navbar />
    </Container>
  );
}

export default Index;
