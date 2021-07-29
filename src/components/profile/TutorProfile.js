import React from "react";
import Courses from "../Courses";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { API_URL } from "../../config";

const useStyles = makeStyles((theme) => ({
  headline: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    maxWidth: 200,
    width: 200,
    height: 200,
    margin: 20,
  },
}));

function TutorProfile(props) {
  const classes = useStyles();

  if (props.user.profilePic === null || props.user.profilePic === undefined) {
    props.user.profilePic = `${API_URL}/images/Avatar.png`;
  }

  return (
    <div>
      <div
        style={{ backgroundColor: "#FAF3DD", margin: 0 }}
        className={props.className}
      >
        <Typography component="h1" className={classes.headline} variant="h5">
          Hi <b>{props.user.username}</b>, Super Tutor!
        </Typography>
        <Avatar className={classes.avatar}>
          <img src={props.user.profilePic} width="200px" alt="profile" />
        </Avatar>
      </div>
      <div>
        <Courses
          currentRole={props.user.role}
          courses={props.courses}
        ></Courses>
      </div>
    </div>
  );
}

export default TutorProfile;
