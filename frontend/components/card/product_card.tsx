import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { addItemToCart, removeItemFromCart } from "../../lib/cart";
import materialUITheme from "../../lib/theme";
import SimpleBtn from "../btn/simple_btn";
import toast from "react-hot-toast";

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

function ProductGridItem({
  product,
  key,
  showAddToCart = true,
  setProducts = (f) => f,
}) {
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

          {showAddToCart ? (
            <SimpleBtn
              onClick={() => {
                addItemToCart(product, () => {
                  toast.success("Added to cart");
                });
              }}
              text="Add to cart"
              width="100%"
            />
          ) : (
            <SimpleBtn
              onClick={() => {
                const cart = removeItemFromCart(product._id);
                toast.success("Removed from cart");
                setProducts(cart);
              }}
              text="Remove from cart"
              width="100%"
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductGridItem;
