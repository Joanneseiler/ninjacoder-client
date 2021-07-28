import React from "react"
import sadNinjaKitty from "../sadNinjaKitty.png"
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    notFound: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginTop: 40,
      padding: 10,
      textAlign: "center",
    },
    header: {
        marginBottom: 20
    },
    homePageButton: {
        textDecoration: "none",
        width: "250px",
    },
    notFoundImage: {
        width: "90%",
        marginBottom: 10
    }
  }));

function NotFound(){
    const classes = useStyles()

    return(
        <Container className={classes.notFound}>
            <Grid>
            <div>
                <Typography component="h1" className={classes.header} variant="h5">
                Hey Kiddo, you better go back to the others, you can't go here!
                </Typography>
                <img src={sadNinjaKitty} alt="sad NinjaKitty" className={classes.notFoundImage}></img>
            </div>
            <Link className={classes.homePageButton}
            to="/">
                <Button
                    style={{ color: "white" }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.homePageButton}>
                    Go back to the homepage
                </Button>
            </Link>
            </Grid>
        </Container>
    )
}

export default NotFound;