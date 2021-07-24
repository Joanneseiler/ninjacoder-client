import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditCourse() {
  const { courseDetail, setCourseDetail } = useState(null);

  useEffect(async () => {
    try {
      let courseId = props.match.params.courseId;
      let response = await axios.get(
        `http://localhost:5005/api/courses/${courseId}`
      );
      setCourseDetail(response.data);
    } catch (err) {
      console.log("Edit course fetch failed", err);
    }
  }, []);
  return <div></div>;
}
