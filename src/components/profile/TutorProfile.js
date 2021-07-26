import React from "react";
import Courses from "../Courses";
import Avatar from "@material-ui/core/Avatar";


function TutorProfile(props) {
  return (
    <div className={props.className}>
      <div className={props.className}>
        <Avatar style={{width:'200px', height:'200px'}}>
            <img src={props.profilePic} width='190px' alt="profile" />
        </Avatar>
        <p>{props.username}</p>
      </div>
      <Courses courses={props.courses}></Courses>
    </div>
  );
}

export default TutorProfile;
