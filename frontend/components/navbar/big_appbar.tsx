import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import SimpleBtn from "../btn/simple_btn";

function BigAppBar({ classes }) {
  return (
    <AppBar className={classes.root} elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.logo}>elite</Typography>

        <Container className={classes.container}>
          <Typography className={classes.listItemTypography}>User</Typography>
          <Typography className={classes.listItemTypography}>Admin</Typography>
          <Typography className={classes.listItemTypography}>Cart</Typography>
          <Typography className={classes.listItemTypography}>Login</Typography>
          <SimpleBtn text="Sign up" onClick={() => {}} />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default BigAppBar;
