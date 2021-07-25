import React, { useState, useEffect } from "react";
import axios from "axios";

function EditCourse(props) {
  const { courseDetail, setCourseDetail } = useState(null);

  //   useEffect(async () => {
  //     try {
  //       let courseId = props.match.params.courseId;
  //       let response = await axios.get(
  //         `http://localhost:5005/api/courses/${courseId}`
  //       );
  //       setCourseDetail(response.data);
  //     } catch (err) {
  //       console.log("Edit course fetch failed", err);
  //     }
  //   }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(
          `http://localhost:5005/api/courses/${courseId}`
        );
        setCourseDetail(response.data);
      } catch (err) {
        console.log("Course fetch failed", err);
      }
    };
    getData();
  }, []);

  const handleNameChange = (event) => {
    let newName = event.target.value;
    setCourseDetail({ ...courseDetail, name: newName });
  };

  const handleDescriptionChange = (event) => {
    let newDescription = event.target.value;
    setCourseDetail({ ...courseDetail, description: newDescription });
  };

  const handlePriceChange = (event) => {
    let newPrice = event.target.value;
    setCourseDetail({ ...courseDetail, price: newPrice });
  };

  //const img
  //const video

  if (!courseDetail) {
    return <p>Loading...</p>;
  }

  //const {onEdit}
  return <div></div>;
}

export default EditCourse;
