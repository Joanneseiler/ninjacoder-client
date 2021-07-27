import React from "react";
import Courses from "../Courses";
import Avatar from "@material-ui/core/Avatar";

function ParentProfile(props) {
  if (props.user.profilePic === null || props.user.profilePic === undefined) {
    props.user.profilePic = "http://localhost:5005/images/default-ninja.png";
  }
  console.log("HERE");
  console.log(props.courses);

  return (
    <div>
      <div
        style={{ backgroundColor: "#FAF3DD", margin: 0 }}
        className={props.className}
      >
        <div className={props.className}>
          <Avatar style={{ width: "200px", height: "200px" }}>
            <img src={props.user.profilePic} width="200px" alt="profile" />
          </Avatar>
          <h2>Hello {props.user.username}. 😊</h2>
          <h3>What course would you like to see today? 🥷 🚀</h3>
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

export default ParentProfile;
