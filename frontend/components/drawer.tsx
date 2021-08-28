import { Divider, Drawer, List, ListItem, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles({
  list: {
    width: "250px",
  },
  fullList: {
    width: "auto",
  },
});

function SmallScreenDrawer({ open, toggleDrawer }) {
  const classes = useStyle();

  const sideList = () => (
    <div
      className={classes.list}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button key={0}>
          Admin
        </ListItem>
        <ListItem button key={1}>
          User
        </ListItem>
        <ListItem button key={2}>
          Cart
        </ListItem>
        <Divider />
        <ListItem button key={3}>
          Login
        </ListItem>
        <ListItem button key={4}>
          Sign up
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer}>
      {sideList()}
    </Drawer>
  );
}

export default SmallScreenDrawer;
