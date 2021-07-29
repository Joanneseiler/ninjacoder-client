import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import { Link } from "react-router-dom";
import SignInLogo from "../Login-logo.png";
import LoadingIndicator from "./LoadingIndicator";

// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
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
    margin: theme.spacing(3, 0, 0),
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
  img: {
    width: "40vh",
    height: "40vh",
  },
}));

function EditCourse(props) {
  const classes = useStyles();
  const [courseDetail, setCourseDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(`${API_URL}/api/courses/${courseId}`, {
          withCredentials: true,
        });
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
    if (newPrice < 0 || newPrice > 999) {
      setErrorMessage("Wrong price!");
    } else {
      setCourseDetail({ ...courseDetail, price: newPrice });
      setErrorMessage(null);
    }
  };

  const handleVideoChange = (event) => {
    let newVideo = event.target.value;
    setCourseDetail({ ...courseDetail, video: newVideo });
  };

  if (!courseDetail) {
    return <LoadingIndicator></LoadingIndicator>;
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form
          className={classes.form}
          onSubmit={(event) => {
            onEditCourse(event, courseDetail);
          }}
          encType="multipart/form-data"
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Course name"
            name="name"
            type="text"
            className={classes.textField}
            onChange={handleNameChange}
            value={courseDetail.name}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            id="description"
            label="Course description"
            name="description"
            type="text"
            rows={5}
            className={classes.textField}
            onChange={handleDescriptionChange}
            value={courseDetail.description}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="price"
            label="Price course"
            name="price"
            type="number"
            className={classes.textField}
            onChange={handlePriceChange}
            value={courseDetail.price}
          />

          <img
            className={classes.img}
            src={courseDetail.image}
            alt="course"
          ></img>
          <input name="image" type="file" accept="image/png, image/jpeg" />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="video"
            label="Video Url ie. : https://www.youtube.com/watch?v="
            name="video"
            type="text"
            className={classes.textField}
            onChange={handleVideoChange}
            value={courseDetail.video}
          />

          <Button
            style={{ color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit changes
          </Button>
        </form>

        <Button
          style={{ color: "white" }}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => props.onDelete(courseDetail._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
          <span> Delete</span>
        </Button>
      </div>
    </Container>
  );
}

export default EditCourse;
