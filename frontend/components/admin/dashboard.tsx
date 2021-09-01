import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import Link from "next/link";
import SimpleBtn from "../btn/simple_btn";

const useStyle = makeStyles((theme: Theme) => ({
  main: { flexGrow: 1, marginTop: theme.spacing(2) },
}));

class AdminAction {
  action: string;
  href: string;

  constructor(action: string, href: string) {
    this.action = action;
    this.href = href;
  }
}

function AdminDashboard() {
  const classes = useStyle();

  const adminActions = [
    new AdminAction("Create category", "/admin/category/create"),
    new AdminAction("Create product", "/admin/product/create"),
  ];

  return (
    <div className={classes.main}>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        Actions
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={1}>
            {adminActions.map((item: AdminAction, key: number) => (
              <Link key={key} href={item.href}>
                <Grid item xs={6} sm={4} md={12}>
                  <SimpleBtn
                    width="100%"
                    key={key}
                    text={item.action}
                    onClick={() => {}}
                  />
                </Grid>
              </Link>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "yellowgreen",
            }}
          ></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;
