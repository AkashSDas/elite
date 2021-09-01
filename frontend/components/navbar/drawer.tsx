import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  makeStyles,
  ListItemIcon,
  Container,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LaptopWindowsIcon from "@material-ui/icons/LaptopWindows";
import { PersonAdd, ShoppingCart } from "@material-ui/icons";
import SimpleBtn from "../btn/simple_btn";
import Link from "next/link";
import materialUITheme from "../../lib/theme";
import { NavItemData } from "../../lib/utils";
import { isAuthenticated, logout } from "../../lib/api/auth";
import { useRouter } from "next/dist/client/router";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  toggleDrawer: Function;
}

const useStyle = makeStyles({
  drawer: { width: "250px" },
  listItemText: {
    fontFamily: materialUITheme.typography.h1.fontFamily,
    fontWeight: "bold",
  },
});

function SideDrawer({ open, toggleDrawer }: Props) {
  const classes = useStyle();
  const router = useRouter();

  /// Nav items
  const section1 = [
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
  ];
  const section2 = [
    new NavItemData("Login", "/auth/login", <PersonAdd />, false, true, false),
    new NavItemData("Sign up", "/auth/signup", null, true, true, false),
    new NavItemData("Logout", "/", null, true, true, true),
  ];

  const navItem = (item: NavItemData, key: number) =>
    item.isBtn ? (
      <Container key={key}>
        <SimpleBtn
          key={key}
          text={item.text}
          onClick={async () => {
            /// If btn is logout then logout user
            if (item.text === "Logout") {
              await logout(() => toast.success("Successfully logged out"));
            }

            router.push(item.route);
          }}
          width="100%"
        />
      </Container>
    ) : (
      <Link href={item.route} key={key}>
        <ListItem button key={key}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText classes={{ primary: classes.listItemText }}>
            {item.text}
          </ListItemText>
        </ListItem>
      </Link>
    );

  const authCheck = (item: NavItemData, key: number) => {
    if (item.authCheck) {
      if (item.displayOnAuth && isAuthenticated()) return navItem(item, key);
      else if (!item.displayOnAuth && !isAuthenticated())
        return navItem(item, key);
    } else return navItem(item, key);
  };

  const drawer = () => (
    <div
      className={classes.drawer}
      onClick={toggleDrawer as any}
      onKeyDown={toggleDrawer as any}
    >
      <List key={0}>
        {section1.map((item: NavItemData, key: number) => authCheck(item, key))}
      </List>

      <Divider />

      <List key={1}>
        {section2.map((item: NavItemData, key: number) => authCheck(item, key))}
      </List>
    </div>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer as any}>
      {drawer()}
    </Drawer>
  );
}

export default SideDrawer;
