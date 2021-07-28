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
    textAlign: "center",
  },
}));

function Profile(props) {
    const classes = useStyles()
   
    if (!props.user){
        return <Redirect to={"/signin"}></Redirect>
    }
    return (
        <>
        {
            props.user.role === 'parent' ? (
            <ParentProfile 
            courses={props.user.coursesBooked} 
            user={props.user}
            className={classes.profile} 
            />
            ) 
            : 
            (
            <TutorProfile 
            courses={props.user.coursesAdded} 
            user={props.user}
            className={classes.profile} 
            />
            )
        }
        </>
    )
}

export default Profile;
