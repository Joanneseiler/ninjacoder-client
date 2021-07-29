import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import { API_URL } from "../config";
import Review from "./Review";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LoadingIndicator from "./LoadingIndicator";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  headline: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    textAlign: "center",
  },
}));

function EnrollLink(props) {
  if (!props.user || !props.user.role || props.user.role !== "parent") {
    return [];
  }

  let courseIdToBuy = props.course._id;

  let isAlredyBooked = props.user.coursesBooked.filter((singleCourseBooked) => {
    return singleCourseBooked._id === courseIdToBuy;
  }).length;

  if (isAlredyBooked) {
    return <p>You've already booked this course</p>;
  }

  if (props.course.price) {
    return <Link to={`/checkout/${courseIdToBuy}`}>Checkout</Link>;
  }
  return <Link to={`/courses/${courseIdToBuy}/payment`}>Free Enroll</Link>;
}

function CourseDetail(props) {
  const [courseDetail, setCourseDetail] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(`${API_URL}/api/courses/${courseId}`, {
          withCredentials: true,
        });
        setCourseDetail(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []); // if courseDetail is not modified, then do not render the side effect of useEffect, again otherwise infinite loop //https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871

  if (!courseDetail) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  return (
    <>
      <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
        {/* <Grid xs={12} sm={6} md={4}>
        <Card className={classes.card}> */}
        <CardMedia className={classes.cardMedia}>
          <img src={courseDetail.image} alt="course"></img>{" "}
        </CardMedia>
        <Typography
          bold
          component="h1"
          className={classes.headline}
          variant="h5"
        >
          {" "}
          {courseDetail.name}
        </Typography>
        <Typography>
          <Box>{courseDetail.description}</Box>
        </Typography>
        <Typography>
          {courseDetail.price <= 0 ? "Free" : `${courseDetail.price} $`}
        </Typography>
        <Typography>By {courseDetail.tutorId.username}</Typography>
        <EnrollLink course={courseDetail} user={props.user}></EnrollLink>
        {/* </Card>
      </Grid> */}
      </Container>
    </>
  );
}

export default CourseDetail;
