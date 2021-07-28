import React, { useState } from "react";
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
  searchBar: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
  },
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
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: "auto",
    paddingTop: "58.25%",
    width: "100%",

    // 16:9
  },
  cardContent: {
    height: 200,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    fontWeight: "bold",
    color: "light",
  },
  price: {
    textSecondary: "main",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  stars: {},
  readMore: { display: "flex", justifyContent: "flex-end" },
}));

function Courses(props) {
  const { courses, currentRole } = props;
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const classes = useStyles();
  const currentUrl = window.location.pathname;

  // Searchbar
  const onHandleSearch = (event) => {
    let searchedCourse = event.target.value;

    let filteredCourses = courses.filter((singleCourse) => {
      return singleCourse.name
        .toLowerCase()
        .includes(searchedCourse.toLowerCase());
    });
    setFilteredCourses(filteredCourses);
  };

  return (
    <>
      <CssBaseline />
      <SearchBar className={classes.searchBar} onSearch={onHandleSearch} />
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {filteredCourses.map((course, card) => (
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

                  <Typography>
                    By{" "}
                    {course.tutorId.username
                      ? course.tutorId.username
                      : "SuperTutor"}
                  </Typography>

                  <Typography className={classes.price}>
                    {course.price} $
                  </Typography>
                  <Review
                    className={classes.stars}
                    courseDetail={course}
                    isReadOnly="true"
                  ></Review>
                </CardContent>
                <CardActions className={classes.readMore}>
                  {currentRole === "tutor" ? (
                    <Link
                      to={
                        currentUrl === "/profile"
                          ? `/courses/${course._id}/edit`
                          : `/courses/${course._id}`
                      }
                      style={{ textDecoration: "none", textColor: "white" }}
                    >
                      <Button size="medium" color="primary">
                        Edit
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to={
                        currentUrl === "/profile"
                          ? `/parent/${course._id}`
                          : `/courses/${course._id}`
                      }
                      style={{ textDecoration: "none", textColor: "white" }}
                    >
                      <Button size="medium" color="primary">
                        Read more
                      </Button>
                    </Link>
                  )}
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
