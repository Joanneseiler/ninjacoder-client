import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, makeStyles } from "@material-ui/core";
import { API_URL } from "../config";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LoadingIndicator from "./LoadingIndicator";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
  cardMedia: {
    width: "100%",
    maxWidth: 1024,
    // 16:9
  },
  cardMediaImage: {
    maxWidth: "100%",
    maxHeight: 512,
  },
  courseDescription: {
    marginTop: 16,
    width: "100%",
    maxWidth: 1024,
  },
  price: {
    marginTop: 16,
  },
  author: {
    marginTop: 16,
    marginBottom: 16,
  },
  checkoutLink: {
    textDecoration: "none",
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
    return (
      <p>
        <b>You've already booked this course</b>
      </p>
    );
  }

  if (props.course.price) {
    return (
      <Link
        className={props.classes.checkoutLink}
        to={`/checkout/${courseIdToBuy}`}
      >
        <Button
          style={{ color: "white" }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
        >
          Checkout
        </Button>
      </Link>
    );
  }
  return (
    <Link
      className={props.classes.checkoutLink}
      to={`/courses/${courseIdToBuy}/payment`}
    >
      <Button
        style={{ color: "white" }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Free Enroll
      </Button>
    </Link>
  );
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
        await props.onFetchUser();
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
          <img
            className={classes.cardMediaImage}
            src={courseDetail.image}
            alt="course"
          ></img>{" "}
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
          <Box className={classes.courseDescription}>
            {courseDetail.description}
          </Box>
        </Typography>
        <Typography className={classes.price}>
          {courseDetail.price <= 0 ? "Free" : `${courseDetail.price} $`}
        </Typography>
        <Typography className={classes.author}>
          Created by{" "}
          <a href={`mailto:${courseDetail.tutorId.email}`}>
            {courseDetail.tutorId.username}
          </a>
        </Typography>
        <EnrollLink
          classes={classes}
          course={courseDetail}
          user={props.user}
        ></EnrollLink>
        {/* </Card>
      </Grid> */}
      </Container>
    </>
  );
}

export default CourseDetail;
