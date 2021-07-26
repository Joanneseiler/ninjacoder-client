import * as React from "react";
// import { Link } from "react-router-dom";

//List of components imported

function AddCourse(props) {
  const { onAddCourse } = props;
  return (
    <div>
      <h4>Add a course</h4>
      <form onSubmit={onAddCourse} encType="multipart/form-data">
        <input name="name" type="text" placeholder="Enter course name" />
        <input
          name="description"
          type="text"
          placeholder="Describe your course"
        />
        <input name="image" type="file" accept="image/png, image/jpeg" />
        <input
          name="video"
          type="text"
          placeholder="https://www.youtube.com/watch?v="
        />
        <input name="price" type="number" placeholder="Enter price" />

        <button type="submit">Submit course</button>
      </form>
    </div>
  );
}

export default AddCourse;
