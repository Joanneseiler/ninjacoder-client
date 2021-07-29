import React, { useState, useEffect } from "react";
import Review from "./Review";
import { API_URL } from "../config";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  coursesparent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
  },
  image: {},
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
      <ReactPlayer light url={courseDetail.video} />
      <Typography gutterBottom variant="h4" component="h2">
        {courseDetail.name}
      </Typography>
      <Typography gutterBottom variant="h6" component="h2">
        {courseDetail.description}
      </Typography>{" "}
      <Typography>By {courseDetail.tutorId.username}</Typography>
      <Review courseDetail={courseDetail}></Review>
      <Link to={"/profile"}>Finished!</Link>
    </div>
  );
}

export default ParentCourseDetail;
