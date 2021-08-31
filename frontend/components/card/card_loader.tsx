import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

function CardLoader() {
  return (
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
}

export default CardLoader;
