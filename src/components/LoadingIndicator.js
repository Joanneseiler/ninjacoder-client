import { CircularProgress } from "@material-ui/core"
import React from "react"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      height: "100vh",
    },
  }));

function LoadingIndicator(){
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <CircularProgress></CircularProgress>
        </div>
    )
}

export default LoadingIndicator;