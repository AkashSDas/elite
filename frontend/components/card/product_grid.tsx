import { Grid } from "@material-ui/core";
import ProductGridItem from "./product_card";

function ProductGrid({ products }) {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {products.map((product, key: number) => (
        <ProductGridItem key={key} product={product} />
      ))}
    </Grid>
  );
}

export default ProductGrid;
