import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme)){

// }

function CourseDetail(props) {
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(
          `http://localhost:5005/api/courses/${courseId}`,
          { withCredentials: true }
        );
        setCourseDetail(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []); // if courseDetail is not modified, then do not render the side effect of useEffect, again otherwise infinite loop //https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871

  if (!courseDetail) {
    return <p>Loading...Bruh</p>;
  }
  return (
    <div>
      <ul>
        <li>
          <img src={courseDetail.image} alt="course"></img>
        </li>
        <li>Name: {courseDetail.name}</li>
        <li>Description: {courseDetail.description}</li>
        <li>Price: {courseDetail.price}</li>
        <li>Tutor: {courseDetail.tutorId.username} </li>

        <li>Video: {courseDetail.video}</li>
      </ul>
      <Link to={`/courses/${courseDetail._id}/payment`}>Enroll</Link>
    </div>
  );
}

export default CourseDetail;
