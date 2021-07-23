import React from "react"
import helloNinjaKitty from "../helloNinjaKitty.png"

function LandingPage(){
    return(
        <div>
           <p>I tested if history.push works. You can change the LandingPage and delete the picture! 
           Later we redirect to profile after sign in. Sign in is working but not sign up! I know sign up is more important, 
           I created a person in postman to check it. Will do the sign up tomorrow!</p>
           <img src={helloNinjaKitty} alt="NinjaKitty says hello"></img>
        </div>
    )
}

export default LandingPage;