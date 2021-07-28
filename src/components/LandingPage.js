import React from "react"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    landingpage: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginTop: 24,
      textAlign: "center",
    },
  }));


function LandingPage(){
    const classes = useStyles()
    
    return(
        <div>
           hello
        </div>
    )
}

export default LandingPage;