import React from "react"
import sadNinjaKitty from "../sadNinjaKitty.png"

function NotFound(){
    return(
        <div>
           <p>Hey Kiddo, you better go back to the others, you can't go here!</p>
           <img src={sadNinjaKitty} alt="sad NinjaKitty"></img>
        </div>
    )
}

export default NotFound;