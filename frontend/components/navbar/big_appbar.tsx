import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { NavItemData } from "../../lib/utils";
import SimpleBtn from "../btn/simple_btn";
import PersonIcon from "@material-ui/icons/Person";
import LaptopWindowsIcon from "@material-ui/icons/LaptopWindows";
import { PersonAdd, ShoppingCart } from "@material-ui/icons";
import Link from "next/link";

function BigAppBar({ classes }) {
  const router = useRouter();

  /// Nav items
  const navitems = [
    new NavItemData("User", "/user", <PersonIcon />),
    new NavItemData("Admin", "/admin", <LaptopWindowsIcon />),
    new NavItemData("Cart", "/cart", <ShoppingCart />),
    new NavItemData("Login", "/auth/login", <PersonAdd />),
  ];

  return (
    <AppBar className={classes.root} elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.logo}>elite</Typography>

        <Container className={classes.container}>
          {navitems.map((item: NavItemData, key: number) => (
            <Link href={item.route}>
              <Typography className={classes.listItemTypography}>
                {item.text}
              </Typography>
            </Link>
          ))}
          <SimpleBtn
            text="Sign up"
            onClick={() => router.push("/auth/signup")}
          />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default BigAppBar;
