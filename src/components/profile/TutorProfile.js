import React from "react";
import Logo from "../../Login-logo.png";
import Courses from "../Courses";

function TutorProfile(props) {
  return (
    <div className={props.className}>
      <div>
        <img style={{ width: "80px", margin: "15px" }} src={Logo} alt="Logo" />
        <p>{props.username}</p>
      </div>
      <Courses courses={props.courses}></Courses>
    </div>
  );
}

export default TutorProfile;
