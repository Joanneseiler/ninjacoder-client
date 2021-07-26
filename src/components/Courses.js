import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Courses(props) {
  const { courses, onHandleSearch } = props;
  const classes = useStyles();

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
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.name}
                  </Typography>
                  <Typography>{course.description}</Typography>
                  <Typography>By {course.tutorId.username}</Typography>
                  <Typography>{course.price}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/courses/${course._id}`}
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
      {/* <div>
        {courses.map((course, i) => {
          return (
            <div key={i}>
              <ul>
                <li>Name: {course.name}</li>
                <li>Description: {course.description}</li>
                <li>Price: {course.price}</li>
                <li>Tutor: {course.tutorId.username} </li>
                <li>
                  <img src={course.image} alt="course"></img>
                </li>
              </ul>
              <Link to={`/courses/${course._id}`}>Read More</Link>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
export default Courses;
