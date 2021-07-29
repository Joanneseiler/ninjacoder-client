import React from "react"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#8FC0A9',
        height: 64,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontFamily: "Lemonade Stand"
    }
  }));
  

function Footer(){
    const classes = useStyles()

    return <footer className={classes.footer}>Made by Anja and Joanne</footer>
}

export default Footer;