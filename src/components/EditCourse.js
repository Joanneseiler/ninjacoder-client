import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EditCourse(props) {
  const [courseDetail, setCourseDetail] = useState(null);

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

  //const img TODO

  const handleVideoChange = (event) => {
    let newVideo = event.target.value;
    setCourseDetail({ ...courseDetail, video: newVideo });
  };

  if (!courseDetail) {
    return <p>Loading...</p>;
  }

  const { onEditCourse } = props;

  return (
    <div>
      <h4>Edit course</h4>
      <form
        onSubmit={(event) => {
          onEditCourse(event, courseDetail);
        }}
        encType="multipart/form-data"
      >
        <input
          onChange={handleNameChange}
          value={courseDetail.name}
          name="name"
          type="text"
          placeholder="Enter course name"
        />
        <input
          onChange={handleDescriptionChange}
          value={courseDetail.description}
          name="description"
          type="text"
          placeholder="Describe your course"
        />
        <input name="image" type="file" accept="image/png, image/jpeg" />
        <input
          onChange={handleVideoChange}
          value={courseDetail.video}
          name="video"
          type="text"
          placeholder="https://www.youtube.com/watch?v="
        />
        <input
          onChange={handlePriceChange}
          value={courseDetail.price}
          name="price"
          type="number"
          placeholder="Enter price"
        />
      
          <button type="submit">Submit changes</button>
      
      </form>
      
        <button onClick={() => props.onDelete(courseDetail._id)}>Delete</button>
     
    </div>
  );
}

export default EditCourse;
