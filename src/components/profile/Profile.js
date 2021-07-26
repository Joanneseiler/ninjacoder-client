import React from "react";
import ParentProfile from "./ParentProfile";
import TutorProfile from "./TutorProfile";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
  },
}));

function Profile(props) {
  console.log(props.location);
  const classes = useStyles();

  if (!props.user) {
    return <Redirect to={"/signin"}></Redirect>;
  }
  return (
    <>
      {props.user.role === "parent" ? (
        <ParentProfile
          courses={props.user.coursesBooked}
          className={classes.profile}
          username={props.user.username}
        />
      ) : (
        <TutorProfile
          courses={props.user.coursesAdded}
          className={classes.profile}
          username={props.user.username}
        />
      )}
    </>
  );
}

export default Profile;
