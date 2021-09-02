import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  card: {
    maxWidth: 345,
    padding: theme.spacing(2),
  },
  banner: {
    maxHeight: 400,
    padding: theme.spacing(1),
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.banner}>
            <CardContent>
              <CardMedia
                component="img"
                alt="Banner"
                image="/banner.jpg"
                title="Banner"
                width="100%"
                height="100%"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Designed for all"
                image="/kids.jpeg"
                title="Designed for all"
              />
              <Typography gutterBottom variant="h5" component="h2">
                Designed for All!
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Linkage was designed for all students—from kindergarten
                through 12th grade—to be fully engaged with their learning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Community"
              image="/community.jpeg"
              title="Community"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Bringing Everyone Together
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Learning is not just about teachers and students. Linkage
                allows you to bring everyone together—students, teachers,
                coaches, parents, administrators—with one communication and
                collaboration platform.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Help"
              image="/help.jpeg"
              title="Help"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Here to Help
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Here at Linkage, we do everything we can can to make it easy
                for districts to get up and running with distance learning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
