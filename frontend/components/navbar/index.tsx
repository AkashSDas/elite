import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import materialUITheme from "../../lib/theme";
import BigAppBar from "./big_appbar";
import MobileAppBar from "./mobile_appbar";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0",
      paddingLeft: "32px",
      paddingRight: "32px",

      [theme.breakpoints.down("md")]: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    toolbar: { display: "flex", justifyContent: "space-between" },
    logo: {
      fontWeight: "bold",
      fontSize: "30px",
      fontFamily: materialUITheme.typography.h1.fontFamily,
      color: materialUITheme.typography.h1.color,
      "&:hover": {
        cursor: "pointer",
      },
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
      fontWeight: 700,
      "&:hover": {
        cursor: "pointer",
        color: materialUITheme.palette.text.primary,
      },
      fontFamily: materialUITheme.typography.h1.fontFamily,
    },
    actionMenu: {
      width: "200px !important",
      fontFamily: materialUITheme.typography.h1.fontFamily,
    },
    mobileAppBar: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    bigAppBar: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

function Navbar() {
  const classes = useStyle();

  /// Drawer state
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((value) => !value);

  return (
    <div>
      <div className={classes.mobileAppBar}>
        <MobileAppBar
          classes={classes}
          open={open}
          toggleDrawer={toggleDrawer}
        />
      </div>

      <div className={classes.bigAppBar}>
        <BigAppBar classes={classes} />
      </div>
    </div>
  );
}

export default Navbar;
