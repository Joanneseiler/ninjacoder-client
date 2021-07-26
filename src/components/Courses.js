import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Courses(props) {
  const { courses, onHandleSearch } = props;

  return (
    <>
      <SearchBar onSearch={onHandleSearch} />
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
