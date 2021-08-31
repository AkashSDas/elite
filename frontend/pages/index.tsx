import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../lib/api/base";
import Skeleton from "@material-ui/lab/Skeleton";
import ProductGridItem from "../components/card/product_card";

const useStyle = makeStyles((theme: Theme) => ({
  main: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
}));

function Index() {
  const classes = useStyle();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const [res, err] = await fetchFromAPI("/product?limit=4", {
      method: "GET",
    });
    setLoading(false);
    if (res) setProducts(res.data.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const loadingJsx = () => (
    <Grid container justifyContent="center" spacing={2}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
        <Grid key={value} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Skeleton
            animation="wave"
            variant="rect"
            height="200px"
            width="100%"
          />
        </Grid>
      ))}
    </Grid>
  );

  const productsJsx = () => (
    <Grid container justifyContent="center" spacing={2}>
      {products.map((product, key: number) => (
        <ProductGridItem key={key} product={product} />
      ))}
    </Grid>
  );

  return (
    <main className={classes.main}>
      {loading ? loadingJsx() : productsJsx()}
    </main>
  );
}

export default Index;
