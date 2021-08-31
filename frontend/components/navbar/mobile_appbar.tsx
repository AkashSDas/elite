import {
  AppBar,
  MenuItem,
  Toolbar,
  Menu,
  IconButton,
  Typography,
  Divider,
  Badge,
} from "@material-ui/core";
import { useState } from "react";
import SideDrawer from "./drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SimpleBtn from "../btn/simple_btn";
import { PersonAdd } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

function MobileAppBar({ classes, open, toggleDrawer }) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /// Work with Menu ///

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar className={classes.root} position="static">
      <SideDrawer open={open} toggleDrawer={toggleDrawer} />
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        <Link href="/">
          <Typography className={classes.logo}>elite</Typography>
        </Link>

        <div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* Adding width to single element will increase the width
              of entire menu */}
            <MenuItem className={classes.actionMenu}>
              <Badge style={{ marginRight: "0.5em" }}>
                <PersonAdd />
              </Badge>
              Login
            </MenuItem>
            <Divider style={{ marginBottom: "0.5em" }} />
            <MenuItem>
              <SimpleBtn
                width="100%"
                text="Sign up"
                onClick={() => router.push("/auth/signup")}
              />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MobileAppBar;
