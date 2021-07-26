import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Review from "./Review";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 0,
    paddingTop: "100%",

    // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    fontWeight: "bold",
    color: "light",
  },
  price: { textSecondary: "main" },
}));

function Courses(props) {
  const { courses, onHandleSearch } = props;
  const classes = useStyles();
  const currentUrl = window.location.pathname;
  console.log(courses);

  return (
    <>
      <CssBaseline />
      <SearchBar onSearch={onHandleSearch} />

      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {courses.map((course, card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={course.image}
                  title="Course image"
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {course.name}
                  </Typography>

                  <Typography>By {course.tutorId.username}</Typography>

                  <Typography color="textSecondary">{course.price}</Typography>
                  <Review isReadOnly="true"></Review>
                </CardContent>
                <CardActions>
                  <Link
                    to={
                      currentUrl === "/profile"
                        ? `/parent/${course._id}`
                        : `/courses/${course._id}`
                    }
                    style={{ textDecoration: "none", textColor: "white" }}
                  >
                    <Button variant="contained" size="medium" color="primary">
                      Read more
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default Courses;
