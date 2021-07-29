import React, { useState, useEffect } from "react";
import Review from "./Review";
import { API_URL } from "../config";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check'
import LoadingIndicator from "./LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  coursesparent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
  },
  image: {},
  videoContainer: {
    marginBottom: 16
  },
  finishLink: {
    textDecoration: "none"
  }
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
  );
}

export default ParentCourseDetail;
