import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import materialUITheme from "../../lib/theme";
import MobileAppBar from "./mobile_appbar";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: { margin: "0" },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
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
      listItemTypography: {
        marginRight: "2rem",
        color: materialUITheme.palette.text.secondary,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },

    actionMenu: {
      width: "200px !important",
    },
  })
);

function Navbar() {
  const classes = useStyle();

  /// Drawer state
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((value) => !value);

  return (
    <MobileAppBar classes={classes} open={open} toggleDrawer={toggleDrawer} />
  );
}

export default Navbar;
