import React, { useState, useEffect } from "react";
import ParentProfile from "./ParentProfile";
import TutorProfile from "./TutorProfile";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
  },
}));

function Profile(props) {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userResponse = await axios.get(`http://localhost:5005/api/user`, {
          withCredentials: true,
        });
        setUser(userResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {user.role === "parent" ? (
        <ParentProfile
          courses={user.coursesBooked}
          user={user}
          className={classes.profile}
        />
      ) : (
        <TutorProfile
          courses={user.coursesAdded}
          user={user}
          className={classes.profile}
        />
      )}
    </>
  );
}

export default Profile;
