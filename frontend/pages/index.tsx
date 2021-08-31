import { makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../lib/api/base";
import CardLoader from "../components/card/card_loader";
import ProductGrid from "../components/card/product_grid";

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

  return (
    <main className={classes.main}>
      {loading ? <CardLoader /> : <ProductGrid products={products} />}
    </main>
  );
}

export default Index;
