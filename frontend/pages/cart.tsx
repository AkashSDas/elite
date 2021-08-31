import { makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ProductGrid from "../components/card/product_grid";
import { loadCart } from "../lib/cart";

const useStyle = makeStyles((theme: Theme) => ({
  main: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
}));

function Cart() {
  const classes = useStyle();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  return (
    <main className={classes.main}>
      {products.length === 0 ? (
        <Typography variant="h1">No products in your cart</Typography>
      ) : (
        <ProductGrid
          showAddToCart={false}
          products={products}
          setProducts={setProducts}
        />
      )}
    </main>
  );
}

export default Cart;
