import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { NavItemData } from "../../lib/utils";
import SimpleBtn from "../btn/simple_btn";
import PersonIcon from "@material-ui/icons/Person";
import LaptopWindowsIcon from "@material-ui/icons/LaptopWindows";
import { PersonAdd, ShoppingCart } from "@material-ui/icons";
import Link from "next/link";
import { isAuthenticated, logout } from "../../lib/api/auth";
import toast from "react-hot-toast";

function BigAppBar({ classes }) {
  const router = useRouter();

  /// Nav items
  const navitems = [
    new NavItemData("User", "/user", <PersonIcon />, false, true, true),
    new NavItemData(
      "Admin",
      "/admin",
      <LaptopWindowsIcon />,
      false,
      true,
      true
    ),
    new NavItemData("Cart", "/cart", <ShoppingCart />, false, true, true),
    new NavItemData("Login", "/auth/login", <PersonAdd />, false, true, false),
    new NavItemData("Sign up", "/auth/signup", null, true, true, false),
    new NavItemData("Logout", "/", null, true, true, true),
  ];

  const navItem = (item: NavItemData, key: number) =>
    item.isBtn ? (
      item.getSimpleBtn(async () => {
        if (item.text === "Logout") {
          await logout(() => toast.success("Successfully logged out"));
        }
        router.push(item.route);
      })
    ) : (
      <Link href={item.route} key={key}>
        <Typography className={classes.listItemTypography}>
          {item.text}
        </Typography>
      </Link>
    );

  const authCheck = (item: NavItemData, key: number) => {
    if (item.authCheck) {
      if (item.displayOnAuth && isAuthenticated()) return navItem(item, key);
      else if (!item.displayOnAuth && !isAuthenticated())
        return navItem(item, key);
    } else return navItem(item, key);
  };

  return (
    <AppBar className={classes.root} elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Typography className={classes.logo}>elite</Typography>
        </Link>

        <Container className={classes.container}>
          {navitems.map((item: NavItemData, key: number) =>
            authCheck(item, key)
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default BigAppBar;
