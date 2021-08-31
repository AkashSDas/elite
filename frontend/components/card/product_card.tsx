import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import materialUITheme from "../../lib/theme";
import SimpleBtn from "../btn/simple_btn";

const useProductCardStyle = makeStyles((theme: Theme) => ({
  root: { width: "100%" },
  media: { height: "180px" },

  name: {
    fontFamily: materialUITheme.typography.h1.fontFamily,
    marginBottom: theme.spacing(1),
    lineClamp: 2,
  },
  description: {
    marginBottom: theme.spacing(1),
    lineClamp: 2,
  },
  info: { marginBottom: theme.spacing(1) },
}));

function ProductGridItem({ product, key }) {
  const classes = useProductCardStyle();

  return (
    <Grid key={key} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card elevation={3} className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.photoURL}
          title={product.name}
        />
        <CardContent>
          <Typography variant="h6" className={classes.name}>
            {product.name}
          </Typography>
          <Typography className={classes.description}>
            {product.description}
          </Typography>
          <Typography className={classes.info}>
            Price Rs.{product.price} | Stocks left {product.stock}
          </Typography>

          <SimpleBtn onClick={() => {}} text="Add to cart" width="100%" />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductGridItem;
