import React, { useState, useEffect } from "react";
import Review from "./Review";
import {API_URL} from "../config"
import axios from "axios";
import { Link } from "react-router-dom";

function ParentCourseDetail(props) {
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(
          `${API_URL}/api/courses/${courseId}`,
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
        <li>Name: {courseDetail.name}</li>
        <li>Video: {courseDetail.video}</li>
        <li>Description: {courseDetail.description}</li>
        <li>Tutor: {courseDetail.tutorId.username} </li>
      </ul>
      <Review courseDetail={courseDetail}></Review>
      <Link to={"/profile"}>Finished!</Link>
    </div>
  );
}

export default ParentCourseDetail;
