import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import SignInLogo from "../Login-logo.png";

// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
}));

function EditCourse(props) {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          style={{ width: "40px", margin: "15px" }}
          src={SignInLogo}
          alt="Sign in Logo"
        />
        <Typography component="h1" variant="h5">
          Edit a course
        </Typography>
        <form
          className={classes.form}
          onSubmit={(event) => {
            onEditCourse(event, courseDetail);
          }}
          encType="multipart/form-data"
        >
          {/* <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Course name"
            name="name"
            type="text"
            className={classes.textField}
          /> */}
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
    </Container>
  );
}

export default EditCourse;
