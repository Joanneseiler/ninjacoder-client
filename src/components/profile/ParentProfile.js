import React from 'react';
import Courses from '../Courses';
import Avatar from "@material-ui/core/Avatar";

function ParentProfile(props) {
    console.log(props)
    return (
        <div>
            <div style={{backgroundColor: "#FAF3DD", margin: 0}}className={props.className}>
                <div className={props.className}>
                    <Avatar style={{width:'200px', height:'200px'}}>
                        <img src={props.profilePic} width='200px' alt="profile" />
                    </Avatar>
                    <p>{props.username}</p>
                </div>
            </div>
            <div className={props.className}> 
            <Courses courses={props.courses}></Courses>
            </div>
        </div>
    )
}

export default ParentProfile;