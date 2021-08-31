import { Grid } from "@material-ui/core";
import ProductGridItem from "./product_card";

function ProductGrid({
  products,
  showAddToCart = true,
  setProducts = (f) => f,
}) {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {products.map((product, key: number) => (
        <ProductGridItem
          showAddToCart={showAddToCart}
          key={key}
          product={product}
          setProducts={setProducts}
        />
      ))}
    </Grid>
  );
}

export default ProductGrid;
