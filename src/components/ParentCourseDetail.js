import React, { useState, useEffect } from "react";
import Review from "./Review";
import { API_URL } from "../config";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Grid } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check'
import LoadingIndicator from "./LoadingIndicator";
import CourseNinjaKitty from "../CourseNinjaKitty.png"

const useStyles = makeStyles((theme) => ({
  coursesparent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  image: {},
  videoContainer: {
    marginBottom: 16,
    padding: 20
  },
  finishLink: {
    textDecoration: "none"
  },
  courseNinjaImageKitty: {
    width: "400px",
    paddingLeft: 30
  },
  coursesparentImageDiv: {
    display: "flex",
    marginTop: 24,
    justifyContent: "flex-end"
  },
}));

function ParentCourseDetail(props) {
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
    <div style={{backgroundColor: "#FAF3DD", margin: 0, paddingBottom: 80}}>
    <Container>
    <Grid>
    <div className={classes.coursesparent}>
      <div className={classes.videoContainer} style={{maxWidth: 640, width: "100%"}}>
        <ReactPlayer width="100%" light url={courseDetail.video} />
      </div>
      <Typography gutterBottom variant="h4" component="h2">
        {courseDetail.name}
      </Typography>
      <Typography gutterBottom>
        {courseDetail.description}
      </Typography>{" "}
      {/* <Typography>By {courseDetail.tutorId.username}</Typography> */}
      <Typography>
        Created by <a href={`mailto:${courseDetail.tutorId.email}`}>{courseDetail.tutorId.username}</a>
      </Typography>
      <Review courseDetail={courseDetail}></Review>
      <Link className={classes.finishLink} to={"/profile"}>
        <Button
              style={{color: "white"}}
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
        >
          Finished
        </Button>
    </Link>
    </div>
    <div className={classes.coursesparentImageDiv}>
    <img 
    src={CourseNinjaKitty} 
    alt="happy ninjakitty"
    className={classes.courseNinjaImageKitty}
    >
    </img>
    </div>
    </Grid>
    </Container>
    </div>
  );
}

export default ParentCourseDetail;
