import React from "react";
import {Redirect} from "react-router-dom"
import ParentAccount from "./ParentAccount";
import TutorAccount from "./TutorAccount";


function Account(props) {
   
    if (!props.user){
        return <Redirect to={"/signin"}></Redirect>
    }
    return (
        <>
        {
            props.user.role === 'parent' ? (
            <ParentAccount
            username={props.user.username}
            />
            ) 
            : 
            (
            <TutorAccount
            username={props.user.username}
            />
            )
        }
        </>
    )
}

export default Account;
