import React, { useState, useEffect } from "react";
import ParentProfile from "./ParentProfile";
import TutorProfile from "./TutorProfile";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {API_URL} from "../../config"
import LoadingIndicator from "../LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 24,
    textAlign: "center",
  },
}));

function Profile(props) {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/api/user`, {
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
    return <LoadingIndicator></LoadingIndicator>;
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
