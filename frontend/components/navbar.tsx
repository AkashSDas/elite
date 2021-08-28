import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { useState } from "react";
import materialUITheme from "../lib/theme";
import SmallScreenDrawer from "./drawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      // width: "100%",
      margin: "0",
      // padding: "1rem 3rem",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-around",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      [theme.breakpoints.between("xs", "xl")]: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    listItemTypography: {
      marginRight: "2rem",
      color: materialUITheme.palette.text.secondary,
      "&:hover": {
        cursor: "pointer",
      },
    },
    button: {
      textTransform: "capitalize",
      color: "white",
      fontWeight: "bold",
      padding: "0.5rem 2rem",
      backgroundColor: materialUITheme.palette.secondary.main,
      "&:hover": {
        backgroundColor: blue[300],
      },
    },
  })
);

function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <AppBar className={classes.appbar} position="static">
      <SmallScreenDrawer
        open={open}
        toggleDrawer={toggleDrawer}
      ></SmallScreenDrawer>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={toggleDrawer}>✅</IconButton>
        <Typography className={classes.logo}>elite</Typography>
        <Container fixed className={classes.container}>
          <Typography className={classes.listItemTypography}>Admin</Typography>
          <Typography className={classes.listItemTypography}>
            Dashboard
          </Typography>
          <Typography
            style={{ marginRight: "0" }}
            className={classes.listItemTypography}
          >
            Cart
          </Typography>
        </Container>
        <Container fixed className={classes.container}>
          <Typography className={classes.listItemTypography}>Login</Typography>
          <Button className={classes.button}>Sign up</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
