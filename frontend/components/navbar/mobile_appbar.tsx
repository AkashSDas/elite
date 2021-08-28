import {
  AppBar,
  MenuItem,
  Toolbar,
  Menu,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import SideDrawer from "./drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SimpleBtn from "../btn/simple_btn";

function MobileAppBar({ classes, open, toggleDrawer }) {
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

        <Typography className={classes.logo}>elite</Typography>

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
            <MenuItem className={classes.actionMenu}>Login</MenuItem>
            <MenuItem>
              <Divider />
            </MenuItem>
            <MenuItem>
              <SimpleBtn text="Sign up" onClick={() => {}} />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MobileAppBar;
