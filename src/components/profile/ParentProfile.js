import React from "react";
import Courses from "../Courses";
import Avatar from "@material-ui/core/Avatar";
import {API_URL} from "../../config"
import { Typography } from "@material-ui/core";

function ParentProfile(props) {
    if (props.user.profilePic === null || props.user.profilePic === undefined) {
        props.user.profilePic = `${API_URL}/images/default-ninja.png`
    }
    
    return (
        <div>
            <div style={{backgroundColor: "#FAF3DD", margin: 0}} className={props.className}>
                <div className={props.className}>
                <Typography component="h1" variant="h5">
                    Hello <b>{props.user.username}! 😊</b>
                    </Typography>
                    <Avatar style={{width:'200px', height:'200px', marginTop: 10, marginBottom: 20}}>
                        <img src={props.user.profilePic} width='200px' alt="profile" />
                    </Avatar>
                    <Typography style= {{fontSize: 18, marginBottom: 20}} component="h2" variant="h5">
                    Are you ready to become a great <b>Ninja Coder</b>? 🥷 🚀
                    </Typography>
                </div>
            </div>
            <Typography className={props.className} style= {{fontSize: 18, marginTop: 30}} component="h2" variant="h5">
                    What course would you like to see today?
                    </Typography>
        <div>
            <Courses
            currentRole={props.user.role}
            courses={props.courses}>
            </Courses>
        </div>
    </div>
  );
}

export default ParentProfile;
