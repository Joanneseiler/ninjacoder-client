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
  const classes = useStyles();
  console.log(props.user);
  if (!props.user) {
    return <Redirect to={"/signin"}></Redirect>;
  }
  return (
    <>
      {props.user.role === "parent" ? (
        <ParentProfile
          courses={props.user.coursesBooked}
          profilePic={props.user.profilePic}
          className={classes.profile}
          username={props.user.username}
        />
      ) : (
        <TutorProfile
          courses={props.user.coursesAdded}
          profilePic={props.user.profilePic}
          className={classes.profile}
          username={props.user.username}
        />
      )}
    </>
  );
}

export default Profile;
