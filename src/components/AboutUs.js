import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom"
import StockImageCarousel from "./ImageCarousel";


const useStyles = makeStyles((theme) => ({
    aboutUsPage: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    },
    aboutUsHeadline: {
        backgroundColor: "#C8D5B9",
    },
    aboutUsHeader: {
        fontSize: 60,
        marginTop: 5
    },
    aboutUsHeaderP: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10
    },
    aboutUsImage: {
        marginTop: 40,
        width: "60%"
    }
  }));


function AboutUs() {
    const classes = useStyles()

    return(
        <div className={classes.aboutUsHeadline}>
            <Container  className={classes.aboutUsPage}>
                <Grid>
                    <Typography style={{marginTop: 30}} className={classes.aboutUsHeader} component="h1" variant="h5">
                    AboutUs
                    </Typography>
                    <Typography className={classes.aboutUsHeaderP} component="h2" variant="h5">
                    Kids are having an incredible amount of fun.
                    </Typography>
                    <Container className={classes.aboutUsPage}>
            
                        <img src="" alt="NinjaKitty" className={classes.aboutUsImage}></img>
                    </Container>
                    <Typography className={classes.aboutUsHeader} component="h1" variant="h5">
                    Learning is fun!
                    </Typography>
                    <StockImageCarousel></StockImageCarousel>
                </Grid>
            </Container>
        </div>
    )
}

export default AboutUs;