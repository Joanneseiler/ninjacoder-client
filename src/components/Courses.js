import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Courses(props) {
  const { courses, handleSearch } = props;
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div>
        {courses.map((course, i) => {
          return (
            <div key={i}>
              <ul>
                <li>Name: {course.name}</li>
                <li>Description: {course.description}</li>
                <li>Price: {course.price}</li>
                <li>Tutor: {course.tutorId.username} </li>
                <li>
                  <img src={course.image} alt="course"></img>
                </li>
              </ul>
              <Link to={`/courses/${course._id}`}>Read More</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Courses;
