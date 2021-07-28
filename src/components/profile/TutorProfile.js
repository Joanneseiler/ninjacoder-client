import React from "react";
import Courses from "../Courses";
import Avatar from "@material-ui/core/Avatar";
import envelope from "../../envelope-solid.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {API_URL} from "../../config"

const useStyles = makeStyles((theme) => ({
  headline: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    maxWidth: 200,
    width: "100%",
    height: "100%",
    margin: 20,
  },
}));

function TutorProfile(props) {
  const classes = useStyles();
  if (props.user.profilePic === null || props.user.profilePic === undefined) {
   props.user.profilePic = `${API_URL}/images/Avatar.png`
  }

  return (
    <div>
      <div
        style={{ backgroundColor: "#FAF3DD", margin: 0 }}
        className={props.className}
      >
        <Typography component="h1" className={classes.headline} variant="h5">
          Hi <b>{props.user.username}</b>, super tutor!
        </Typography>
        <Avatar className={classes.avatar}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={props.user.profilePic}
            alt="profile"
          />
        </Avatar>
        <div>
          <Typography className={classes.headline}>
            <img src={envelope} alt="envelope" style={{ width: 15 }} />
            <span style={{ marginLeft: 10 }}>{props.user.email}</span>
          </Typography>
        </div>
      </div>
      <div className={props.className}>
        <Courses
          currentRole={props.user.role}
          courses={props.courses}
        ></Courses>
      </div>
    </div>
  );
}

export default TutorProfile;
