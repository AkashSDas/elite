import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  makeStyles,
  ListItemIcon,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LaptopWindowsIcon from "@material-ui/icons/LaptopWindows";
import { PersonAdd, ShoppingCart } from "@material-ui/icons";
import SimpleBtn from "../btn/simple_btn";
import Link from "next/link";
import materialUITheme from "../../lib/theme";

interface Props {
  open: boolean;
  toggleDrawer: Function;
}

const useStyle = makeStyles({
  drawer: { width: "250px" },
  listItemText: {
    fontFamily: materialUITheme.typography.fontFamily,
    fontWeight: "bold",
  },
});

/// To capsulate nav item data
class NavItemData {
  text: string;
  icon: any;
  route: string;
  isBtn: boolean;

  constructor(text: string, route: string, icon?: any, isBtn = false) {
    this.text = text;
    this.route = route;
    this.icon = icon;
    this.isBtn = isBtn;
  }
}

function SideDrawer({ open, toggleDrawer }: Props) {
  const classes = useStyle();

  /// Nav items
  const section1 = [
    new NavItemData("User", "/user", <PersonIcon />),
    new NavItemData("Admin", "/admin", <LaptopWindowsIcon />),
    new NavItemData("Cart", "/cart", <ShoppingCart />),
  ];
  const section2 = [
    new NavItemData("Login", "/auth/login", <PersonAdd />),
    new NavItemData("Sign up", "/auth/signup", null, true),
  ];

  const drawer = () => (
    <div
      className={classes.drawer}
      onClick={toggleDrawer as any}
      onKeyDown={toggleDrawer as any}
    >
      <List key={0}>
        {section1.map((item: NavItemData, key: number) => (
          <Link href={item.route}>
            <ListItem button key={key}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className={classes.listItemText}>
                {item.text}
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List key={1}>
        {section2.map((item: NavItemData, key: number) => {
          if (item.isBtn)
            return (
              <Link href={item.route}>
                <ListItem button key={key}>
                  <SimpleBtn text={item.text} onClick={() => {}} />
                </ListItem>
              </Link>
            );

          return (
            <Link href={item.route}>
              <ListItem button key={key}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText className={classes.listItemText}>
                  {item.text}
                </ListItemText>
              </ListItem>
            </Link>
          );
        })}
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
