import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormError from "../FormError";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { API_URL } from "../../config";

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
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
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
    marginTop: theme.spacing(2),
  },
  headline: {
    textAlign: "center",
  },
}));

const getInitialImage = (props) => {
  if (props.user === null || props.user === undefined) {
    return null;
  }

  if (props.user.profilePic !== null) {
    return props.user.profilePic;
  }

  return getDefaultProfilePicByRole(props);
};

const getDefaultProfilePicByRole = (props) => {
  if (props.user.role === "parent") {
    return `${API_URL}/images/default-ninja.png`;
  }

  return `${API_URL}/images/Avatar.png`;
};

function Account(props) {
  const classes = useStyles();
  let history = useHistory();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialImage = getInitialImage(props);
  const [imagePreview, setImagePreview] = useState(initialImage);

  if (!props.user) {
    return <Redirect to={"/signin"}></Redirect>;
  }

  const setImage = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleAccountSubmit = async (event) => {
    setErrors([]);
    setLoading(true);
    event.preventDefault();

    if (!validateFormData(event.target)) {
      setLoading(false);
      return;
    }

    let profilePic;

    if (
      event.target.profilePic !== undefined &&
      event.target.profilePic.files.length > 0
    ) {
      profilePic = await uploadProfilePic(event.target.profilePic.files[0]);
    }

    await submitFormData(event.target, profilePic, props.user.role);
    setLoading(false);
  };

  const validateFormData = (formData) => {
    const { username, email, password, repeatedPassword, kidAge, secretWord } =
      formData;
    let validationErros = [];

    if (username.value === "") {
      validationErros.push("Username not set");
    }

    if (email.value === "") {
      validationErros.push("E-Mail not set");
    }

    if (password.value.length < 8) {
      validationErros.push("Password too short");
    }

    if (password.value !== repeatedPassword.value) {
      validationErros.push("Passwords don't match");
    }

    if (props.user.role === "parent") {
      if (kidAge.value === "") {
        validationErros.push("Age of your child is not set");
      }

      if (kidAge.value < 0) {
        validationErros.push("Age of your child is negative");
      }

      if (secretWord.value === "") {
        validationErros.push("Secret word is not set");
      }
    }

    setErrors(validationErros);

    return validationErros.length === 0;
  };

  const submitFormData = async (formData, profilePic, role) => {
    const { username, email, password, repeatedPassword } = formData;

    const userEditData = {
      username: username.value,
      email: email.value,
      password: password.value,
      repeatedPassword: repeatedPassword.value,
    };

    if (role === "parent") {
      userEditData.kidAge = formData.kidAge.value;
      userEditData.secretWord = formData.secretWord.value;
    }

    if (profilePic !== undefined && profilePic !== null) {
      userEditData.profilePic = profilePic;
    }

    try {
      const userResponse = await axios.patch(
        `${API_URL}/api/${role}/edit`,
        userEditData,
        { withCredentials: true }
      );

      await props.fetchUser(userResponse.data);
    } catch (err) {
      setErrors(["There was an error editing the user"]);
      console.log(err);
    }
  };

  const uploadProfilePic = async (profilePic) => {
    let formData = new FormData();
    formData.append("imageUrl", profilePic);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        withCredentials: true,
      });

      return response.data.image;
    } catch (err) {
      return null;
    }
  };

  const handleAccountDelete = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      await axios.delete(`${API_URL}/api/${props.user.role}/delete`, {
        withCredentials: true,
      });
      props.logoutUser();
    } catch (err) {
      setErrors(["There was an error deleting the user"]);
      console.log(err);
    }
  };

  const ParentComponents = (props) => {
    if (!props.isVisible) {
      return <></>;
    }

    return (
      <>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="kidAge"
          label="Age of your child"
          name="kidAge"
          className={classes.textField}
          defaultValue={props.user.kidAge}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          id="secretWord"
          label="Please choose a secret word"
          name="secretWord"
          className={classes.textField}
          defaultValue={props.user.secretWord}
        />
      </>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" className={classes.headline} variant="h5">
          EDIT YOUR ACCOUNT DETAILS
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleAccountSubmit}
        >
          <Avatar style={{ width: "200px", height: "200px", marginBottom: 10 }}>
            <img src={imagePreview} width="200px" alt="profile" />
          </Avatar>
          <input
            onChange={setImage}
            style={{ marginBottom: 10 }}
            type="file"
            name="profilePic"
            accept="image/png, image/jpg"
          ></input>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            className={classes.textField}
            defaultValue={props.user.username}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            className={classes.textField}
            defaultValue={props.user.email}
          />
          <ParentComponents
            classes={classes}
            user={props.user}
            isVisible={props.user.role === "parent"}
          ></ParentComponents>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="repeatedPassword"
            label="Repeat password"
            type="password"
            id="repeatedPassword"
            autoComplete="current-password"
            className={classes.textField}
          />

          {errors.map((error, i) => {
            return <FormError key={i} text={error}></FormError>;
          })}

          <Button
            style={{ color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Button
            style={{ color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleAccountDelete}
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
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Account;
