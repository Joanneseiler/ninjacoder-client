import React from "react";
import { Link } from "react-router-dom";

function Course(props) {
  const { courses } = props;
  return (
    <div>
      {courses.map((course, i) => {
        return (
          <p key={i}>
            <ul>
              <li>Name: {course.name}</li>
              <li>Description: {course.description}</li>
              <li>Price: {course.price}</li>
              <li>
                <img src={course.image} alt="course"></img>
              </li>
            </ul>
            <Link to={`/courses/${course._id}`}>Read More</Link>
          </p>
        );
      })}
    </div>
  );
}
export default Course;
