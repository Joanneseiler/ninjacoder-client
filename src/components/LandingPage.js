import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom"
import NinjaKittyLP from "../LandingPageNinja.png"

const useStyles = makeStyles((theme) => ({
    landingpage: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    },
    landingHeadline: {
        backgroundColor: "#FAF3DD",
    },
    landingHeader: {
        fontSize: 60,
        marginTop: 5
    },
    landingHeaderP: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10
    },
    landingButton: {
        color: "white",
        textDecoration: "none",
        marginTop: 10,
        width: 150
    },
    landingPageImage: {
        marginTop: 40,
        width: "60%"
    }
  }));


function LandingPage(){
    const classes = useStyles()

    return(
        <div className={classes.landingHeadline}>
            <Container  className={classes.landingpage}>
                <Grid>
                    <Typography style={{marginTop: 30}} className={classes.landingHeader} component="h1" variant="h5">
                    CODING
                    </Typography>
                    <Typography className={classes.landingHeader} component="h1" variant="h5">
                    FOR KIDS
                    </Typography>
                    <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                    Programming courses that playfully help your child to be equipped for a successful life
                    </Typography>
                    <Container className={classes.landingpage}>
                    <Link className={classes.landingButton}
                        to="/signin">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.landingButton}>
                                Parent
                            </Button>
                        </Link>
                        <Link className={classes.landingButton}
                        to="/signin">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.landingButton}>
                                Tutor
                            </Button>
                        </Link>
                        <img src={NinjaKittyLP} alt="NinjaKitty" className={classes.landingPageImage}></img>
                    </Container>
                </Grid>
            </Container>
        </div>
    )
}

export default LandingPage;